import React, { useState } from 'react';
import {
  Box,
  Button,
  SwipeableDrawer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MenuIcon } from 'components/common/Icons';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  buttonRoot: {
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  navLink: {
    color: COLORS.GRAY,
    textDecoration: 'none',
    cursor: 'pointer',
  },
}));

const SideMenu = ({ minWidth = '15vw', children }) => {
  const classes = useStyles();
  const [anchor, setAnchor] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setAnchor(open);
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button classes={{ root: classes.buttonRoot }} aria-controls="header-menu" aria-haspopup="true" onClick={toggleDrawer(true)} disableRipple>
        <MenuIcon />
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={anchor}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          minWidth={minWidth}
        >
          {children}
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default React.memo(SideMenu);
