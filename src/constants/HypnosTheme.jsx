import React, { useState, useEffect } from 'react';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import useViewport from 'hooks/useViewport';

const customTheme = {
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
      'sans-serif',
    ],
    fontStyle: 'normal',
    htmlFontSize: 16,
    fontSize: 16,
    h2: {
      fontWeight: 600,
      letterSpacing: '1.5px',
    },
    h3: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '1.5px',
    },
    h5: {
      fontWeight: 700,
      fontSize: 32,
      letterSpacing: '1.5px',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.5rem',
      letterSpacing: '1.5px',
    },
    button: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      light: '#c1a1ed',
      main: '#9072ba',
      dark: '#61468a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffae83',
      main: '#e67e56',
      dark: '#af502b',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F5F5',
    },
    action: {
      focusOpacity: 0,
    },
  },
  shape: {
    borderRadius: 25,
  },
};

const fontSizesOptions = {
  factor: 1.1,
};

const HypnosTheme = ({ children }) => {
  const [theme, setTheme] = useState(responsiveFontSizes(createMuiTheme(customTheme)));
  const [lastWidth, setLastWidth] = useState(window.innerWidth);
  const { width } = useViewport();

  useEffect(() => {
    if (width <= 600 && lastWidth > 600) {
      customTheme.spacing = 5;
      let newTheme = createMuiTheme(customTheme);
      newTheme = responsiveFontSizes(newTheme, fontSizesOptions);
      setTheme(newTheme);
    } else if (width > 600 && lastWidth <= 600) {
      customTheme.spacing = 8;
      let newTheme = createMuiTheme(customTheme);
      newTheme = responsiveFontSizes(newTheme, fontSizesOptions);
      setTheme(newTheme);
    }

    setLastWidth(width);
  }, [width, lastWidth]);


  theme.shadows[24] = 'rgba(209, 230, 255, 0.57) 0px 2px 24px 1px;';

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default HypnosTheme;
