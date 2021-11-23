// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    type: 'dark',
    mode: 'dark',
    primary: {
      main: '#00e676',
    },
    secondary: {
      main: '#2962ff',
    },
    background: {
      default: '#262738',
      paper: '#363646',
    },
    error: {
      main: '#f50057',
    },
    success: {
      main: '#00e676',
    },
    divider: 'rgba(124,77,255,0.65)',
  },
  // typography: {
  //   fontFamily: 'Cairo',
  //   body1: {
  //     fontFamily: 'Cairo',
  //   },
  //   h1: {
  //     fontFamily: 'Monoton',
  //   },
  //   h2: {
  //     fontFamily: 'Monoton',
  //   },
  //   h3: {
  //     fontFamily: 'Monoton',
  //   },
  // },
});
