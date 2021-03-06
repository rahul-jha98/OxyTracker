/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export default class Firebase {
  auth = firebase.auth();

  firestore = firebase.firestore();

  constructor() {
    this.user = null;
  }

  setSignInListener = (onSignInChanged, onSignInFailed) => {
    this.onSignInChanged = onSignInChanged;
    this.onSignInFailed = onSignInFailed;
    this.auth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.onSignInChanged(null);
        return null;
      }
      const doesExist = await this.checkIfAdminExist(user.email);
      if (doesExist) {
        this.onSignInChanged(user);
      } else {
        this.onSignInFailed('You are not a registered admin.');
        firebase.auth().signOut();
      }
      return null;
    });
  }

  signOut = () => {
    this.auth.signOut();
  }

  getUser = () => ({
    name: this.auth.currentUser.displayName,
    email: this.auth.currentUser.email,
    avatarUrl: this.auth.currentUser.photoURL,
  })

  checkIfAdminExist = async (email) => {
    const userRef = this.firestore.doc(`admins/${email}`);
    const snapshot = await userRef.get();
    return snapshot.exists;
  };

  checkIfUserExist = async (phoneNo) => {
    const userRef = this.firestore.doc(`users/${phoneNo}`);
    const snapshot = await userRef.get();
    return snapshot.exists;
  };

  addUser = async (phoneNo, payload) => {
    const userRef = this.firestore.doc(`users/${phoneNo}`);
    try {
      await userRef.set({ ...payload, adder_admin: this.auth.currentUser.email });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }

  addAdmin = async (email, payload) => {
    const adminRef = this.firestore.doc(`admins/${email}`);
    try {
      await adminRef.set({ ...payload, adder_admin: this.auth.currentUser.email });
    } catch (error) {
      console.log('Error in creating admin', error);
    }
  }

  fetchDocuments = async (relativePath) => {
    const data = new Map();
    const snapShot = await firebase.firestore().collection(relativePath).get();
    snapShot.docs.forEach((doc) => {
      data.set(doc.id, doc.data());
    });
    return data;
  }

  fetchUsers = async () => this.fetchDocuments('users')

  fetchCylinders = async () => this.fetchDocuments('cylinders')

  fetchCitizens = async () => this.fetchDocuments('citizens')

  fetchHistory = async (id) => {
    const snapShot = await firebase.firestore().doc(`history/${id}`).get();
    return snapShot.data();
  }

  getQRDownloadLink = async (cylinderID) => {
    const storageRef = firebase.storage().ref();

    return storageRef.child(`QR/${cylinderID}.jpg`).getDownloadURL();
  }

  getPrescriptionLink = async (fileName) => {
    const storageRef = firebase.storage().ref();

    return storageRef.child(`Receipt/${fileName}`).getDownloadURL();
  }

  changeField = async (phone, obj) => {
    await firebase.firestore()
      .collection('users')
      .doc(phone)
      .update(obj);
  }
}
