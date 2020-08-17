import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import styles from './Navigation.module.css';

const DesktopMenu = () => (
  <Box>
    <Grid container spacing={2} justify="flex-end" alignItems="center" wrap="nowrap">
      {[
        <Grid item key="signin">
          <NavLink to="signin" className={styles.navLink} activeClassName={styles.navLinkActive}>
            <Typography variant="subtitle1" noWrap>Sign In</Typography>
          </NavLink>
        </Grid>,
        <Grid item key="community">
          <a className={styles.navLink} href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
            <Typography variant="subtitle1" className={styles.navLink}>Community</Typography>
          </a>
        </Grid>,
        <Grid item key="requestAccess">
          <Button variant="contained" color="primary" size="small" href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
            <Typography variant="subtitle1" noWrap>Request Access</Typography>
          </Button>
        </Grid>,
      ]}
    </Grid>
  </Box>
);

export default DesktopMenu;
