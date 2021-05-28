export default class Database {
  constructor(firebaseHandler, setDataSource) {
    this.userMapping = {};
    this.customerMapping = {};
    this.cylinderMapping = {};

    this.firebaseHandler = firebaseHandler;
    this.setDataSource = setDataSource;
  }

  startRefetchLoop = async (mins) => {
    this.refetch();
    setInterval(() => {
      this.refetch();
    }, mins * 60 * 1000);
  }

  refetch = async () => {
    const users = await this.firebaseHandler.fetchUsers();
    const cylinders = await this.firebaseHandler.fetchCylinders();
    const citizens = await this.firebaseHandler.fetchCitizens();

    const usersList = this.prepareUserTableData(users);
    const cylinderList = this.prepareCylinderData(cylinders, users, citizens);
    this.cylinderMapping = cylinderList;
    this.userMapping = usersList;

    this.setDataSource(cylinderList, usersList, {});
  }

  prepareCylinderData = (cylinders, users, citizens) => {
    const cylindersList = {};

    cylinders.forEach((data, id) => {
      let entity = null;
      if (data.isCitizen) {
        const owner = citizens.get(data.current_owner) || {};
        entity = {
          name: owner.name, role: 'Citizen', owner,
        };
      } else {
        const { name, role } = users.get(data.current_owner) || {};
        entity = {
          name, role, owner: { name, role, phone: data.current_owner },
        };
      }
      entity = {
        ...entity, ...data, cylinder_id: id, date: data.timestamp.seconds,
      };
      cylindersList[id] = entity;
    });
    return cylindersList;
  }

  prepareUserTableData = (users) => {
    const usersList = {};

    users.forEach((data, phone) => {
      usersList[phone] = { ...data, phone, cylinderCount: data.cylinders.length };
    });
    return usersList;
  }

  prepareCustomerData = () => {
    // same
  }
}
