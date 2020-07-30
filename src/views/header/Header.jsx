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
import MobileMenu from 'components/navigation/MobileMenu';
import DesktopMenu from 'components/navigation/DesktopMenu';
import styles from './Header.module.css';

const Header = () => {
  const { isMedium } = useMedium();
  return (
    <AppBar position="sticky" elevation={0} color="default">
      <Box>
        <Toolbar>
          <Grid container alignItems="center" justify="space-between" wrap="nowrap">
            <Grid item>
              <NavLink className={styles.navLink} exact to="/">
                <Box display="flex" alignItems="center">
                  <img src={logo} alt="SleepWell Logo" height="45px" />
                  <Typography className={styles.logoName} color="textPrimary" variant="h5" display="inline">Hypnos.ai</Typography>
                  <Chip label="beta" color="primary" variant="outlined" size="small" style={{ marginLeft: '0.5rem' }} />
                </Box>
              </NavLink>
            </Grid>
            <Grid item container wrap="nowrap" justify="flex-end" alignItems="center">
              <Box id="changelog" component="span" />
              {
                isMedium
                  ? <MobileMenu />
                  : <DesktopMenu />
              }
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default React.memo(Header);
