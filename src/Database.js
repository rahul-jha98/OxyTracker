export default class Database {
  constructor(firebaseHandler) {
    this.cylinderData = [];
    this.userTableData = [];
    this.customerData = [];

    this.userMapping = {};
    this.customerMapping = {};
    this.cylinderMapping = {};

    this.firebaseHandler = firebaseHandler;
    this.refetch();
    // ab yahan ek timer lagana hai jo 10 min me ise wapas run kare
  }

  refetch = async () => {
    this.userMapping = await this.firebaseHandler.fetchUsers();
    this.cylinderMapping = await this.firebaseHandler.fetchCylinders();
    this.customerMapping = await this.firebaseHandler.fetchCustomers();

    const newCylinderData = this.prepareCylinderData();
    const newUserTableData = this.prepareUserTableData();
    const newCustomerData = this.prepareCustomerData();

    this.cylinderData = newCylinderData;
    this.userTableData = newUserTableData;
    this.customerData = newCustomerData;
  }

  prepareCylinderData = () => []

  prepareUserTableData = () => {
    // teeno maaping hai usse yeh data bhar do

  }

  prepareCustomerData = () => {
    // same
  }
}
