export default class Database {
  constructor(firebaseHandler) {
    this.cylinderData = [];
    this.userTableData = [];
    this.customerData = [];

    this.userMapping = {};
    this.customerMapping = {};
    this.cylinderMapping = {};

    this.firebaseHandler = firebaseHandler;
  }

  startRefetchLoop = async (mins) => {
    this.refetch();
    setInterval(() => {
      this.refetch();
    }, mins * 60 * 1000);
    // ab yahan ek timer lagana hai jo 10 min me ise wapas run kare
  }

  refetch = async () => {
    const users = await this.firebaseHandler.fetchUsers();
    const cylinders = await this.firebaseHandler.fetchCylinders();
    const citizens = await this.firebaseHandler.fetchCitizens();

    const usersList = this.prepareUserTableData(users);
    const cylinderList = this.prepareCylinderData(cylinders, users, citizens);
    this.cylinderMapping = cylinderList;
    this.userMapping = usersList;
  }

  prepareCylinderData = (cylinders, users, citizens) => {
    const cylindersList = {};

    cylinders.forEach((data, id) => {
      let entity = null;
      if (data.isCitizen) {
        const owner = citizens.get(data.current_owner) || {};
        entity = {
          ...data, owner, name: owner.name, role: 'Citizen', cylinder_id: id,
        };
      } else {
        const { name, role } = users.get(data.current_owner) || {};
        entity = {
          ...data, name, owner: { name, role, phone: data.current_owner }, cylinder_id: id,
        };
      }
      entity.date = entity.timestamp.seconds;
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
