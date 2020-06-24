import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import UserContext from 'context/userContext';
import UserServices from 'services/UserServices';
import AlertSystemContext from 'context/alertSystemContext';
import styles from './Navigation.module.css';

const DesktopMenu = () => {
  const { user, dispatchUser } = useContext(UserContext);
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const history = useHistory();

  const handleLogoutClick = () => {
    (async () => {
      try {
        await UserServices.logout();
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
    <Box m={1.5}>
      <Grid container spacing={2} alignItems="center">
        {
        !user._id
          ? ([
            <Grid item key="signin">
              <NavLink key="signin" to="signin" className={styles.navLink} activeClassName={styles.navLinkActive}>
                <Typography variant="subtitle1">Sign In</Typography>
              </NavLink>
            </Grid>,
            <Grid item key="community">
              <a className={styles.navLink} href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
                <Typography variant="subtitle1" className={styles.navLink}>Community</Typography>
              </a>
            </Grid>,
            <Grid item key="requestAccess">
              <Button variant="contained" disableElevation color="primary" size="small" href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
                <Typography variant="subtitle1">Request Access</Typography>
              </Button>
            </Grid>,
          ])
          : [
            <Grid item key="dashboard">
              <NavLink key="dashboard" to="/dashboard" className={styles.navLink} activeClassName={styles.navLinkActive}>
                <Typography variant="subtitle1">Dashboard</Typography>
              </NavLink>
            </Grid>,
            <Grid item key="dailydiary">
              <NavLink key="dailyDiary" to="/daily-diary" className={styles.navLink} activeClassName={styles.navLinkActive}>
                <Typography variant="subtitle1">Daily Diary</Typography>
              </NavLink>
            </Grid>,
            <Grid item key="settings">
              <NavLink key="settings" to="/settings" className={styles.navLink} activeClassName={styles.navLinkActive}>
                <Typography variant="subtitle1">Account</Typography>
              </NavLink>
            </Grid>,
            <Grid item key="feedback">
              <a className={styles.navLink} href={`https://sleepwell.typeform.com/to/zNgvJ7?email=${user.email}`} target="_blank" rel="noopener noreferrer">
                <Typography variant="subtitle1" className={styles.navLink}>Feedback</Typography>
              </a>
            </Grid>,
            <Grid item key="community">
              <a className={styles.navLink} href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
                <Typography variant="subtitle1" className={styles.navLink}>Community</Typography>
              </a>
            </Grid>,
            <Grid item key="logout">
              <Typography variant="subtitle1" className={styles.navLink} onClick={handleLogoutClick} color="error">Logout</Typography>
            </Grid>,
          ]
      }
      </Grid>
    </Box>
  );
};

export default DesktopMenu;
