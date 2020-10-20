import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Typography,
  Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import logo from 'assets/sleepwell-logo-transpbg.png';
import useMedium from 'hooks/useMedium';
import DesktopMenu from 'components/navigation/DesktopMenu';
import CenterMenu from 'components/navigation/CenterMenu';
import BottomNav from 'components/navigation/BottomNav';
import DrawerMenu from 'components/navigation/DrawerMenu';
import HeadwayWidget from 'components/common/HeadwayWidget';
import { useUserState } from 'context/userContext';
import COLORS from 'constants/colors';
import styles from './Header.module.css';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: COLORS.WHITE,
    height: '48px',
    maxHeight: '48px',
    padding: `0 ${theme.spacing(2)}px`,
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

  return (
    <AppBar className={clsx(classes.header)} position="sticky" elevation={0} color="inherit">
      <Grid container alignItems="center" justify="space-between" wrap="nowrap" style={{ margin: 'auto 0' }}>
        <Grid item>
          <NavLink className={classes.logoNav} exact to="/">
            <Box display="flex" alignItems="center">
              {/* <img src={logo} alt="SleepWell Logo" height="35px" /> */}
              <Typography color="textPrimary" variant="h6" display="inline">Hypnos.ai</Typography>
              <Chip label="beta" color="primary" variant="outlined" size="small" style={{ marginLeft: '0.5rem' }} />
              <HeadwayWidget />
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
                <img src={logo} alt="SleepWell Logo" height="30px" />
                <Typography className={styles.logoName} color="textPrimary" variant="subtitle1" display="inline">Hypnos.ai</Typography>
                <Chip label="beta" color="primary" variant="outlined" size="small" style={{ marginLeft: '0.5rem' }} />
                <HeadwayWidget />
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
