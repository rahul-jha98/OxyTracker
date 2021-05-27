export default class Firebase {
  constructor() {
    this.user = null;
  }

  signIn = () => {
    this.onSignInChanged(true);
  }

  signOut = () => {
    this.onSignInChanged(null);
  }

  setSignInListener = (onSignInChanged, onSignInFailed) => {
    this.onSignInChanged = onSignInChanged;
    this.onSignInFailed = onSignInFailed;
  }

  getUser = () => ({
    name: 'Rahul Jha',
    email: 'jharahul1998@gmail.com',
    avatarUrl: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
  })

  addUser = (phoneNo, payload) => ({ phoneNo: payload })
}
