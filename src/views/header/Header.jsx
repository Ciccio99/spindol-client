import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Menu,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import logo from 'assets/sleepwell-logo-transpbg.png';
import UserContext from '../../context/userContext';
import UserServices from '../../services/UserServices';
import AlertSystemContext from '../../context/alertSystemContext';
import styles from './Header.module.css';

const Header = () => {
  const { user, dispatchUser } = useContext(UserContext);
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    (async () => {
      try {
        await UserServices.logout();
        handleClose();
      } catch (error) {
        dispatchAlertSystem({
          type: 'ERROR',
          message: error.response.data.message,
        });
      } finally {
        dispatchUser({
          type: 'USER_LOGOUT',
        });
        history.push('/signin');
      }
    })();
  };

  return (
    <AppBar position="sticky" elevation={0} color="default">
      <Box>
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <NavLink className={styles.navLink} exact to="/">
                <Box display="flex" alignItems="center">
                  <img src={logo} alt="SleepWell Logo" height="45px" />
                  <Typography className={styles.logoName} color="textPrimary" variant="h5" display="inline">Hypnos.ai</Typography>
                </Box>
              </NavLink>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justify="space-around">
                <Grid item>
                  <Box m={1.5}>
                    <Button aria-controls="header-menu" aria-haspopup="true" onClick={handleClick} disableRipple>
                      <MenuRoundedIcon fontSize="large" />
                    </Button>
                    <Menu
                      id="header-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      transitionDuration={200}
                      variant="selectedMenu"
                      elevation={2}
                      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                      {
                      !user._id
                        ? ([
                          <NavLink key="signin" to="signin" className={styles.navLink} activeClassName={styles.navLinkActive}>
                            <MenuItem onClick={handleClose}>
                              <Typography variant="h6">Sign In</Typography>

                            </MenuItem>
                          </NavLink>,
                          <NavLink key="register" to="register" className={styles.navLink} activeClassName={styles.navLinkActive}>
                            <MenuItem onClick={handleClose}>
                              <Typography variant="h6">Register</Typography>

                            </MenuItem>
                          </NavLink>,
                        ])
                        : [
                          <NavLink key="dashboard" to="/dashboard" className={styles.navLink} activeClassName={styles.navLinkActive}>
                            <MenuItem key="dashboard" onClick={handleClose}>
                              <Typography variant="h6">Dashboard</Typography>
                            </MenuItem>
                          </NavLink>,
                          <NavLink key="dailyDiary" to="/daily-diary" className={styles.navLink} activeClassName={styles.navLinkActive}>
                            <MenuItem key="dailydiary" onClick={handleClose}>
                              <Typography variant="h6">Daily Diary</Typography>
                            </MenuItem>
                          </NavLink>,
                          <NavLink key="settings" to="/settings" className={styles.navLink} activeClassName={styles.navLinkActive}>
                            <MenuItem key="settings" onClick={handleClose}>
                              <Typography variant="h6">Account</Typography>
                            </MenuItem>
                          </NavLink>,
                          <MenuItem key="logout" onClick={handleLogoutClick}>
                            <Typography variant="h6" className={styles.navLink}>Logout</Typography>
                          </MenuItem>,
                        ]
                    }
                    </Menu>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
