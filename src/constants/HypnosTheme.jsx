import React, { useState, useEffect } from 'react';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import useMobile from 'hooks/useMobile';
import BREAKPOINTS from 'constants/breakpoints';
import COLORS from 'constants/colors';

const customTheme = {
  typography: {
    fontFamily: [
      'Sora',
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
      'Antic Didone',
    ],
    fontStyle: 'normal',
    htmlFontSize: 16,
    fontSize: 16,
    body1: {
      fontWeight: 400,
      fontSize: '0.875rem',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    overline: {
      fontFamily: 'Antic Didone',
      fontSize: '3.5rem',
      fontWeight: 400,
      lineHeight: 1.17,
      textTransform: 'none',
      display: 'block',
    },
    h1: {
      fontWeight: 400,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    h3: {
      fontWeight: 400,
      fontSize: '2rem',
      fontFamily: 'Antic Didone',
    },
    h4: {
      fontWeight: 500,
      fontSize: '0.75rem',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    h6: {
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    button: {
      fontWeight: 400,
      fontSize: '0.875rem',
      color: COLORS.DARK_BLUE,
      textTransform: 'none',
    },
  },
  breakpoints: {
    values: {
      xs: BREAKPOINTS.xs,
      sm: BREAKPOINTS.sm,
      md: BREAKPOINTS.md,
      lg: BREAKPOINTS.lg,
      xl: BREAKPOINTS.xl,
    },
  },
  palette: {
    primary: {
      light: COLORS.PEACH_1,
      main: COLORS.PEACH,
      dark: COLORS.DARK_PEACH,
      contrastText: COLORS.BLACK,
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
    borderRadius: 0,
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
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: COLORS.PEACH,
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: COLORS.DARK_GRAY,
      },
      toolbarBtnSelected: {
        color: COLORS.BLACK,
      },
    },
    MuiPickersDay: {
      daySelected: {
        color: COLORS.BLACK,
        backgroundColor: COLORS.PEACH,
        '&:hover': {
          backgroundColor: COLORS.LIGHT_GRAY,
        },
      },
    },
  },
};

const fontSizesOptions = {
  factor: 2,
};

const HypnosTheme = ({ children }) => {
  const [theme, setTheme] = useState(
    responsiveFontSizes(createMuiTheme(customTheme))
  );
  const { isMobile } = useMobile();

  useEffect(() => {
    if (isMobile) {
      customTheme.spacing = 6;
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

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default HypnosTheme;
