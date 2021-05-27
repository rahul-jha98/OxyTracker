import React from 'react';

import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import MainApp from './MainApp';
import ApiHandlerProvider from './provider/ApiHandlerProvider';
import Firebase from './Firebase';

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
  constructor(props) {
    super(props);
    this.state = { user: true, toast: '' };
    this.firebase = new Firebase();
  }

  componentDidMount = () => {
    this.firebase.setSignInListener(
      (user) => {
        this.setState({ user });
      },
      () => {
        // error maybe due to user not having access, network error etc
      },
    );
  }

  render() {
    const { user } = this.state;
    let screen = <h1>HomePage</h1>;
    if (user) {
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
