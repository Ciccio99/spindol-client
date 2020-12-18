import React from 'react';
import { NavLink } from 'react-router-dom';
import {
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
    color: COLORS.GRAY,
    textDecoration: 'none',
    cursor: 'pointer',
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
          <Grid item key="community">
            <a className={styles.navLink} href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
              <Typography variant="body1" className={clsx(classes.navLink)}>Community</Typography>
            </a>
          </Grid>,
          <Grid item key="signin">
            <NavLink to="signin" className={clsx(classes.navLink)} activeClassName={clsx(classes.activeNavLink)}>
              <Typography variant="body1" noWrap>Sign In</Typography>
            </NavLink>
          </Grid>,
        ]}
      </Grid>
    </div>
  );
};

export default DesktopMenu;
