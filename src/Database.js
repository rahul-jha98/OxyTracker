export default class Database {
  constructor(firebaseHandler, setDataSource) {
    this.userMapping = {};
    this.citizensMapping = {};
    this.cylinderMapping = {};

    this.citizenToCylinderMapping = {};

    this.firebaseHandler = firebaseHandler;
    this.setDataSource = setDataSource;
  }

  startRefetchLoop = (mins) => {
    this.refetch();
    this.taskId = setInterval(() => {
      this.refetch();
    }, mins * 60 * 1000);
  }

  stopRefetchLoop = () => {
    clearInterval(this.intervalID);
  }

  refetch = async () => {
    const users = await this.firebaseHandler.fetchUsers();
    const cylinders = await this.firebaseHandler.fetchCylinders();
    const citizens = await this.firebaseHandler.fetchCitizens();

    const usersList = this.prepareUserTableData(users);
    this.userMapping = usersList;
    const cylinderList = this.prepareCylinderData(cylinders, users, citizens);
    this.cylinderMapping = cylinderList;
    const citizensList = this.prepareCitizensData(citizens);
    this.citizensMapping = citizensList;

    const citizensWithCylinders = {};
    Object.entries(citizensList).forEach(([key, value]) => {
      if (value.cylinder_id) {
        citizensWithCylinders[key] = value;
      }
    });

    this.setDataSource(cylinderList, usersList, citizensWithCylinders);
  }

  getFormattedDateTimeString = (date_ob) => {
    const date = (`0${date_ob.getDate()}`).slice(-2);
    const month = (`0${date_ob.getMonth() + 1}`).slice(-2);
    const year = date_ob.getFullYear();

    let hours = (`0${date_ob.getHours()}`).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    const minutes = (`0${date_ob.getMinutes()}`).slice(-2);
    return [`${year}-${month}-${date}`, `${hours}:${minutes} ${ampm}`];
  }

  dateDifferenceWithoutTime = (dateObj1, dateObj2) => {
    const utc1 = Date.UTC(dateObj1.getFullYear(), dateObj1.getMonth(), dateObj1.getDate());
    const utc2 = Date.UTC(dateObj2.getFullYear(), dateObj2.getMonth(), dateObj2.getDate());

    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)) + 1;
  }

  prepareCylinderData = (cylinders, users, citizens) => {
    const cylindersList = {};
    this.citizenToCylinderMapping = {};
    cylinders.forEach((data, id) => {
      let entity = null;
      if (data.isCitizen) {
        const owner = citizens.get(data.current_owner) || {};
        entity = {
          name: owner.name, role: 'Citizen', owner, phone: owner.phone,
        };
        this.citizenToCylinderMapping[data.current_owner] = id;
      } else {
        const { name, role } = users.get(data.current_owner) || { role: ' ' };
        entity = {
          name, role, owner: { name, role, phone: data.current_owner }, phone: data.current_owner,
        };
      }
      const dateObj = data.timestamp.toDate();
      const [date, time] = this.getFormattedDateTimeString(dateObj);
      entity = {
        ...entity, ...data, cylinder_id: id, timestamp: data.timestamp, date, time,
      };
      cylindersList[id] = entity;
    });
    return cylindersList;
  }

  prepareUserTableData = (users) => {
    const usersList = {};

    users.forEach((data, name) => {
      usersList[name] = { ...data, cylinderCount: data.cylinders.length };
    });
    return usersList;
  }

  prepareCitizensData = (citizens) => {
    // same
    const citizensList = {};
    citizens.forEach((data, id) => {
      const cylinderID = this.citizenToCylinderMapping[id];
      if (cylinderID) {
        const cylinderData = this.cylinderMapping[cylinderID];
        const dateObj = cylinderData.timestamp.toDate();
        const dateDiff = this.dateDifferenceWithoutTime(dateObj, new Date());
        citizensList[id] = {
          ...data,
          citizen_id: id,
          cylinder_id: cylinderData.cylinder_id,
          dateDiff,
          date: cylinderData.date,
          time: cylinderData.time,
          role: 'Citizen',
        };
      } else {
        citizensList[id] = {
          ...data,
          citizen_id: id,
        };
      }
    });
    return citizensList;
  }

  getHistoryFor = async (id) => {
    const data = await this.firebaseHandler.fetchHistory(id) || {};
    const owners = [];
    if (!data.owners) {
      return [];
    }
    data.owners.forEach((history) => {
      let entity = {};
      if (history.isCitizen) {
        const owner = this.citizensMapping[history.current_owner] || {};
        entity = {
          name: owner.name, role: 'Citizen', owner,
        };
      } else {
        const { name, role } = this.userMapping[history.current_owner] || {};
        entity = {
          name, role, owner: { name, role, phone: history.current_owner },
        };
      }
      const dateObj = history.timestamp.toDate();
      const [date, time] = this.getFormattedDateTimeString(dateObj);
      entity = {
        ...entity, ...history, date, time,
      };
      owners.push(entity);
    });
    owners.reverse();
    return owners;
  }

  changeCanExit = async (name, canExit) => {
    await this.firebaseHandler.changeField(name, { canExit });
    this.refetch();
  }

  changeCanGenerateQR = async (name, canGenerateQR) => {
    await this.firebaseHandler.changeField(name, { canGenerateQR });
    this.refetch();
  }
}
