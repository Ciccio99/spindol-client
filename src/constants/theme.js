import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

let theme = {
  typography: {
    fontFamily: [
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
    h3: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 700,
      fontSize: 32,
    }
  },
  palette: {
    background: {
      default: '#F5F5F5',
    },
  },
};

theme = createMuiTheme(theme);
theme = responsiveFontSizes(theme);

export default theme;
