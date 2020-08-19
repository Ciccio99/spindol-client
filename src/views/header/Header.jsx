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
import logo from 'assets/sleepwell-logo-transpbg.png';
import useMedium from 'hooks/useMedium';
import DesktopMenu from 'components/navigation/DesktopMenu';
import CenterMenu from 'components/navigation/CenterMenu';
import BottomNav from 'components/navigation/BottomNav';
import DrawerMenu from 'components/navigation/DrawerMenu';
import { useUserState } from 'context/userContext';
import styles from './Header.module.css';

const Header = () => {
  const user = useUserState();
  const { isMedium } = useMedium();

  if (user._id) {
    return isMedium ? <MobileNavigation /> : <AuthDesktopNavigation />;
  }

  return isMedium ? <MobileNavigation /> : <DesktopNavigation />;
};

const DesktopNavigation = () => (
  <AppBar position="sticky" elevation={0} color="default">
    <Toolbar>
      <Grid container alignItems="center" justify="space-between" wrap="nowrap" style={{ marginTop: '-1px' }}>
        <Grid item>
          <NavLink className={styles.navLink} exact to="/">
            <Box display="flex" alignItems="center">
              <img src={logo} alt="SleepWell Logo" height="45px" />
              <Typography className={styles.logoName} color="textPrimary" variant="h6" display="inline">Hypnos.ai</Typography>
              <Chip label="beta" color="primary" variant="outlined" size="small" style={{ marginLeft: '0.5rem' }} />
              <Box id="changelog" component="span" />
            </Box>
          </NavLink>
        </Grid>
        <Grid item>
          <DesktopMenu />
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

const AuthDesktopNavigation = () => (
  <AppBar position="sticky" elevation={0} color="default">
    <Toolbar>
      <Grid container alignItems="center" justify="space-between" wrap="nowrap" style={{ marginTop: '-1px' }}>
        <Grid item xs={2}>
          <NavLink className={styles.navLink} exact to="/">
            <Box display="flex" alignItems="center">
              <img src={logo} alt="SleepWell Logo" height="45px" />
              <Typography className={styles.logoName} color="textPrimary" variant="h6" display="inline">Hypnos.ai</Typography>
              <Chip label="beta" color="primary" variant="outlined" size="small" style={{ marginLeft: '0.5rem' }} />
              <Box id="changelog" component="span" />
            </Box>
          </NavLink>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end">
            <CenterMenu />
            <DrawerMenu />
          </Box>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

const MobileNavigation = () => (
  <>
    <AppBar position="sticky" elevation={0} color="default">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between" wrap="nowrap" style={{ marginTop: '-1px' }}>
          <Grid item>
            <NavLink className={styles.navLink} exact to="/">
              <Box display="flex" alignItems="center">
                <img src={logo} alt="SleepWell Logo" height="45px" />
                <Typography className={styles.logoName} color="textPrimary" variant="h6" display="inline">Hypnos.ai</Typography>
                <Chip label="beta" color="primary" variant="outlined" size="small" style={{ marginLeft: '0.5rem' }} />
                <Box id="changelog" component="span" />
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
