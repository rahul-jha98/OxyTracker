import React from 'react';

import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { StyledFirebaseAuth } from 'react-firebaseui';
// eslint-disable-next-line import/no-extraneous-dependencies
import firebase from 'firebase/app';
import MainApp from './MainApp';
import ApiHandlerProvider from './provider/ApiHandlerProvider';
import Firebase from './Firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyCbGWlv_6igZpLGLQLGx5wKr1Ufd6Lv0ZI',
  authDomain: 'o2-tracker.firebaseapp.com',
  projectId: 'o2-tracker',
});

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FF6863',
    },
    secondary: {
      main: '#ff231c',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#F5F5F5',
      },
    },
  },
});

class App extends React.Component {
  uiconfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  constructor(props) {
    super(props);
    this.state = { user: null, toast: '' };
    this.firebase = new Firebase();
  }

  componentDidMount = () => {
    this.firebase.setSignInListener(
      (user) => {
        console.log(user);
        this.setState({ user });
      },
      (errorMessage) => {
        // error maybe due to user not having access, network error etc
        this.setState({ toast: errorMessage });
      },
    );
  }

  render() {
    const { user } = this.state;
    let screen = (
      <div>
        <StyledFirebaseAuth
          uiConfig={this.uiconfig}
          firebaseAuth={firebase.auth()}
        />
        <div><p> Helloooo</p></div>
      </div>
    );
    if (user) {
      console.log('logged in ', user);
      screen = (
        <ApiHandlerProvider
          firebaseHandler={this.firebase}
          showToast={(message) => this.setState({ toast: message })}
        >
          <MainApp />
        </ApiHandlerProvider>
      );
    }

    return (
      <>
        {screen}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={Boolean(this.state.toast)}
          autoHideDuration={5000}
          message={this.state.toast}
          onClose={() => { this.setState({ toast: '' }); }}
          key={this.state.toast}
        />
      </>
    );
  }
}

export default () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
