import React, { useState, useEffect } from 'react';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';

const customTheme = {
  typography: {
    fontFamily: [
      // "'Exo 2'",
      'Sora',
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
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.8rem',
    },
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
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    button: {
      fontWeight: 400,
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
    tertiary: {
      light: '#9dcbe2',
      main: '#6d9ab0',
      dark: '#3e6c81',
      contrastText: '#fff',
    },
    background: {
      default: '#FFF8F8',
    },
    action: {
      focusOpacity: 0,
    },
  },
  shape: {
    // borderRadius: 5,
    // borderRadiusSmall: 10,
  },
  overrides: {
    MuiPaper: {
      root: {
        border: `1px solid ${COLORS.BORDER_GRAY}`,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '10px',
        border: 0,
      },
    },
  },
};

const fontSizesOptions = {
  factor: 1.1,
};

const HypnosTheme = ({ children }) => {
  const [theme, setTheme] = useState(responsiveFontSizes(createMuiTheme(customTheme)));
  const { isMobile } = useMobile();

  useEffect(() => {
    if (isMobile) {
      customTheme.spacing = 4;
      let newTheme = createMuiTheme(customTheme);
      newTheme = responsiveFontSizes(newTheme, fontSizesOptions);
      setTheme(newTheme);
    } else {
      customTheme.spacing = 8;
      let newTheme = createMuiTheme(customTheme);
      newTheme = responsiveFontSizes(newTheme, fontSizesOptions);
      setTheme(newTheme);
    }
  }, [isMobile]);


  theme.shadows[24] = '6px 6px 0px rgba(0, 0, 0, 0.05);';

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default HypnosTheme;
