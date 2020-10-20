import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';
import styles from './Navigation.module.css';

const useStyles = makeStyles((theme) => ({
  navLink: {
    color: COLORS.LIGHT_GRAY,
    textDecoration: 'none',
    cursor: 'pointer',
    '& span': {
      // fontSize: theme.typography.subtitle2.fontSize,
    },
  },
  activeNavLink: {
    color: COLORS.RED,
  },
  menuDiv: {
    marginRight: theme.spacing(1),
  },
}));

const DesktopMenu = () => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.menuDiv)}>
      <Grid container spacing={2} justify="flex-end" alignItems="center" wrap="nowrap">
        {[
          <Grid item key="signin">
            <NavLink to="signin" className={clsx(classes.navLink)} activeClassName={clsx(classes.activeNavLink)}>
              <Typography variant="subtitle2" noWrap>Sign In</Typography>
            </NavLink>
          </Grid>,
          <Grid item key="community">
            <a className={styles.navLink} href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
              <Typography variant="subtitle2" className={clsx(classes.navLink)}>Community</Typography>
            </a>
          </Grid>,
          <Grid item key="requestAccess">
            <Button variant="contained" color="primary" size="small" href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
              <Typography variant="subtitle2" noWrap>Request Access</Typography>
            </Button>
          </Grid>,
        ]}
      </Grid>
    </div>
  );
};

export default DesktopMenu;
