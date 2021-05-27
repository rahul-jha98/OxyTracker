/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default class Firebase {
  constructor() {
    this.user = null;
  }

 auth = firebase.auth();

firestore = firebase.firestore();

checkIfAdminExist = async (user) => {
  const userRef = this.firestore.doc(`admins/${user.uid}`);
  const snapshot = await userRef.get();
  return snapshot.exists;
};

  signIn = () => {
    this.onSignInChanged(true);
  }

  signOut = () => {
    this.auth.signOut();
  }

  getConfig = () => (
    {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => false,
      },
    }
  )

  setSignInListener = (onSignInChanged, onSignInFailed) => {
    console.log(this.auth, this.firestore);
    this.onSignInChanged = onSignInChanged;
    this.onSignInFailed = onSignInFailed;
    this.auth.onAuthStateChanged(async (user) => {
      console.log('user is ', user);
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
      // if (this.state.isSignedIn && this.state.isValidAdmin) {
      //   const allUsers = await getAllUsersData()

      //   const allCylinders = await getAllCylindersData()
      //   const allCitizens =  await getAllCitizens()

      //   const cylinderData = getCyclinderTableData(  allUsers,   allCylinders,   allCitizens)
      //   console.log("cyclinder data for table is ", cylinderData)
      //   this.setState({ data:cylinderData})
      // }
    });
  }

  getUser = () => ({
    name: this.auth.currentUser.displayName,
    email: this.auth.currentUser.email,
    avatarUrl: this.auth.currentUser.photoURL,
  })

  addUser = (phoneNo, payload) => ({ phoneNo: payload })
}
