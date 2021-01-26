import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Divider, Toolbar, Grid, Box, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SideMenu from 'components/common/SideMenu';
import LogoutWrapper from 'components/common/LogoutWrapper';
import { HypnosYellowIcon } from 'components/common/Icons';
import COLORS from 'constants/colors';
import ROUTES from 'constants/routes';

const useStyles = makeStyles(() => ({
  logoNav: {
    textDecoration: 'none',
  },
  navLink: {
    color: COLORS.GRAY,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  activeLink: {
    color: COLORS.RED,
  },
}));

const ListItemBase = ({ children }) => (
  <Box width="100%" py={1} px={2}>
    {children}
  </Box>
);

const NonAuthList = () => {
  const classes = useStyles();
  return (
    <SideMenu minWidth="50vw">
      <Grid container direction="column" spacing={2} style={{ paddingTop: 8 }}>
        <Grid item>
          <ListItemBase>
            <NavLink to={ROUTES.signIn} exact className={classes.navLink} activeClassName={classes.activeLink}>
              <Typography variant="body1" noWrap className={classes.navLink}>Sign In</Typography>
            </NavLink>
          </ListItemBase>
        </Grid>
        <Grid item>
          <ListItemBase>
            <a href={ROUTES.landingPage} target="_blank" rel="noopener noreferrer">
              <Typography variant="body1" className={classes.navLink} noWrap>
                Learn More
              </Typography>
            </a>
          </ListItemBase>
        </Grid>
      </Grid>
    </SideMenu>
  );
};

const AuthList = () => {
  const classes = useStyles();

  return (
    <SideMenu minWidth="50vw">
      <Grid container direction="column" spacing={2} style={{ paddingTop: 8 }}>
        <Grid item>
          <ListItemBase>
            <NavLink to={ROUTES.home} exact className={classes.navLink} activeClassName={classes.activeLink}>
              <Typography variant="body1" noWrap>Dashboard</Typography>
            </NavLink>
          </ListItemBase>
        </Grid>
        <Grid item>
          <ListItemBase>
            <NavLink to={ROUTES.dailyDiary} className={classes.navLink} activeClassName={classes.activeLink}>
              <Typography variant="body1" noWrap>Daily Diary</Typography>
            </NavLink>
          </ListItemBase>
        </Grid>
        <Grid item>
          <ListItemBase>
            <NavLink to={ROUTES.data} exact className={classes.navLink} activeClassName={classes.activeLink}>
              <Typography variant="body1" noWrap>Data</Typography>
            </NavLink>
          </ListItemBase>
        </Grid>
        <Grid item>
          <ListItemBase>
            <NavLink to={ROUTES.account} exact className={classes.navLink} activeClassName={classes.activeLink}>
              <Typography variant="body1" noWrap>Account</Typography>
            </NavLink>
          </ListItemBase>
        </Grid>
        <Divider />
        <Grid item>
          <ListItemBase>
            <LogoutWrapper>
              <Typography variant="body1" className={classes.navLink} noWrap>
                Sign Out
              </Typography>
            </LogoutWrapper>
          </ListItemBase>
        </Grid>
      </Grid>
    </SideMenu>
  );
};

export default function MobileNavigation({ isAuth }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" elevation={0} color="inherit">
      <Toolbar>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          wrap="nowrap"
          style={{ marginTop: '-1px' }}
        >
          <Grid item>
            <NavLink className={classes.navLink} exact to="/">
              <Box display="flex" alignItems="center">
                <HypnosYellowIcon />
              </Box>
            </NavLink>
          </Grid>
          <Grid item>
            {
            isAuth
              ? <AuthList />
              : <NonAuthList />
          }
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
