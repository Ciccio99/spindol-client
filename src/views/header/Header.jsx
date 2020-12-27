import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMedium from 'hooks/useMedium';
import useScrollY from 'hooks/useScrollY';
import DesktopMenu from 'components/navigation/DesktopMenu';
import CenterMenu from 'components/navigation/CenterMenu';
import BottomNav from 'components/navigation/BottomNav';
import DrawerMenu from 'components/navigation/DrawerMenu';
import { useUserState } from 'context/userContext';
import { HypnosYellowIcon } from 'components/common/Icons';
import COLORS from 'constants/colors';
import styles from './Header.module.css';

const useStyles = makeStyles((theme) => ({
  stickyHeader: {
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    height: '48px',
    maxHeight: '48px',
    padding: `0 ${theme.spacing(2)}px`,
    transition: 'all 0.30s ease-in-out',
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  logoNav: {
    textDecoration: 'none',
  },
}));

const Header = () => {
  const user = useUserState();
  const { isMedium } = useMedium();

  if (user._id) {
    return isMedium
      ? <MobileNavigation />
      : (
        <DesktopNavBar>
          <Box display="flex" justifyContent="flex-end">
            <CenterMenu />
            <DrawerMenu />
          </Box>
        </DesktopNavBar>
      );
  }

  return isMedium
    ? <MobileNavigation />
    : (
      <DesktopNavBar>
        <DesktopMenu />
      </DesktopNavBar>
    );
};

const DesktopNavBar = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();
  const { isScrolled } = useScrollY(50);

  return (
    <AppBar className={clsx(classes.stickyHeader, { [classes.transparentHeader]: !isScrolled && location.pathname === '/' })} position="sticky" elevation={0} color="inherit">
      <Grid container alignItems="center" justify="space-between" wrap="nowrap">
        <Grid item>
          <NavLink className={classes.logoNav} exact to="/">
            <Box display="flex" alignItems="center">
              <HypnosYellowIcon />
            </Box>
          </NavLink>
        </Grid>
        <Grid item>
          {children}
        </Grid>
      </Grid>
    </AppBar>
  );
};

const MobileNavigation = () => (
  <>
    <AppBar position="sticky" elevation={0} color="inherit">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between" wrap="nowrap" style={{ marginTop: '-1px' }}>
          <Grid item>
            <NavLink className={styles.navLink} exact to="/">
              <Box display="flex" alignItems="center">
                <HypnosYellowIcon />
              </Box>
            </NavLink>
          </Grid>
          <Grid item>
            <DrawerMenu />
          </Grid>
        </Grid>
      </Toolbar>

    </AppBar>
    <BottomNav />
  </>
);

export default React.memo(Header);
