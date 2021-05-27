import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MainApp from './MainApp';

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

function App() {
  return (
    <MainApp />
  );
}

export default () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
