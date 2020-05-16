import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

let theme = {
  typography: {
    fontFamily: [
      // "'Exo 2'",
      'Work Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif'
    ],
    fontStyle: 'normal',
    htmlFontSize: 16,
    fontSize: 16,
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h5: {
      fontWeight: 700,
      fontSize: 32,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    button: {
      fontWeight: 700,
    }
  },
  palette: {
    primary: {
      light: '#c1a1ed',
      main: '#9072ba',
      dark: '#61468a',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ffae83',
      main: '#e67e56',
      dark: '#af502b',
      contrastText: '#fff'
    },
    background: {
      default: '#F5F5F5',
    },
  },
  shape: {
    borderRadius: 10,
  },
};

theme = createMuiTheme(theme);
theme = responsiveFontSizes(theme);

export default theme;
