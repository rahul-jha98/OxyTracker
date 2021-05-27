/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default class Firebase {
  auth = firebase.auth();

  firestore = firebase.firestore();

  constructor() {
    this.user = null;
  }

  setSignInListener = (onSignInChanged, onSignInFailed) => {
    console.log(this.auth, this.firestore);
    this.onSignInChanged = onSignInChanged;
    this.onSignInFailed = onSignInFailed;
    this.auth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.onSignInChanged(null);
        return null;
      }
      const doesExist = await this.checkIfAdminExist(user);
      if (doesExist) {
        this.onSignInChanged(user);
      } else {
        this.onSignInFailed('Contact authority, not a registered admin');
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

  checkIfAdminExist = async (user) => {
    const userRef = this.firestore.doc(`admins/${user.email}`);
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
      await userRef.set(
        payload,
      );
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }

  fetchUsers = async () => {
  }

  fetchCylinders = async () => {
  }

  fetchCustomers = async () => {
  }
}