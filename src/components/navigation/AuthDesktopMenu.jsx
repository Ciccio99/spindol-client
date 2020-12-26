import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import { useUserState, useUserDispatch } from 'context/userContext';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import styles from './Navigation.module.css';
import { ADMIN_ROLE } from 'constants/Roles';
import LogoutWrapper  from 'components/LogoutWrapper';

const DesktopMenu = () => {
  const user = useUserState();
  const dispatchUser = useUserDispatch();

  return (
    <Box>
      <Grid container spacing={2} justify="flex-end" alignItems="center" wrap="nowrap">
          <Grid item key="dashboard">
            <NavLink key="dashboard" to="/dashboard" className={styles.navLink} activeClassName={styles.navLinkActive}>
              <Typography variant="subtitle1">Dashboard</Typography>
            </NavLink>
          </Grid>
          <Grid item key="dailydiary">
            <NavLink key="dailyDiary" to="/daily-diary" className={styles.navLink} activeClassName={styles.navLinkActive}>
              <Typography variant="subtitle1" noWrap>Daily Diary</Typography>
            </NavLink>
          </Grid>
          <Grid item key="settings">
            <NavLink key="settings" to="/settings" className={styles.navLink} activeClassName={styles.navLinkActive}>
              <Typography variant="subtitle1">Account</Typography>
            </NavLink>
          </Grid>
          <Grid item key="feedback">
            <a className={styles.navLink} href={`https://sleepwell.typeform.com/to/zNgvJ7?email=${user.email}`} target="_blank" rel="noopener noreferrer">
              <Typography variant="subtitle1" className={styles.navLink}>Feedback</Typography>
            </a>
          </Grid>
          <Grid item key="community">
            <a className={styles.navLink} href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
              <Typography variant="subtitle1" className={styles.navLink}>Community</Typography>
            </a>
          </Grid>
          <Grid item key="logout">
            <LogoutWrapper>
              <Typography variant="subtitle1" className={styles.navLink} color="error">Logout</Typography>
            </LogoutWrapper>
          </Grid>
      </Grid>
    </Box>
  );
};

export default DesktopMenu;
