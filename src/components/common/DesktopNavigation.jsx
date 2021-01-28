import React from 'react';
import { AppBar, Divider, Grid, Typography, Box } from '@material-ui/core';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import useScrollY from 'hooks/useScrollY';
import { makeStyles } from '@material-ui/core/styles';
import SideMenu from 'components/common/SideMenu';
import { SpindolLogoIcon } from 'components/common/Icons';
import LogoutWrapper from 'components/common/LogoutWrapper';
import COLORS from 'constants/colors';
import ROUTES from 'constants/routes';

const useStyles = makeStyles((theme) => ({
  stickyHeader: {
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    height: '48px',
    maxHeight: '48px',
    padding: `0 ${theme.spacing(2)}px`,
    transition: 'all 0.30s ease-in-out',
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  logoNav: {
    textDecoration: 'none',
  },
  navLink: {
    color: COLORS.GRAY,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  linkDiv: {
    margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLink: {
    color: COLORS.RED,
  },
}));

const NavItem = ({ to, label }) => {
  const classes = useStyles();
  return (
    <NavLink
      to={to}
      exact
      className={classes.navLink}
      activeClassName={classes.activeLink}
    >
      <div className={classes.linkDiv}>
        <Typography variant="body1" noWrap>
          {label}
        </Typography>
      </div>
    </NavLink>
  );
};

const ListItemBase = ({ children }) => (
  <Box width="100%" py={2} px={2}>
    {children}
  </Box>
);

const AuthList = () => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <NavItem to="/" label="Home" />
      <NavItem to="/daily-diary" label="Daily Diary" />
      <NavItem to="/data" label="Data" />
      <SideMenu>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <ListItemBase>
              <NavLink
                to={ROUTES.account}
                exact
                className={classes.navLink}
                activeClassName={classes.activeLink}
              >
                <Typography variant="body1" noWrap className={classes.navLink}>
                  Account
                </Typography>
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
    </Box>
  );
};

const NonAuthList = () => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <a href={ROUTES.landingPage} target="_blank" rel="noopener noreferrer">
        <div className={classes.linkDiv}>
          <Typography variant="body1" className={classes.navLink} noWrap>
            Learn More
          </Typography>
        </div>
      </a>
      <NavItem to="/signin" label="Sign In" />
    </Box>
  );
};

export default function DesktopNavigation({ isAuth = false }) {
  const classes = useStyles();
  const location = useLocation();
  const { isScrolled } = useScrollY(50);
  const transparentRoutes = ['/signin'];

  return (
    <AppBar
      className={clsx(classes.stickyHeader, {
        [classes.transparentHeader]:
          !isScrolled &&
          transparentRoutes.some((route) => route === location.pathname),
      })}
      position="sticky"
      elevation={0}
      color="inherit"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        wrap="nowrap"
      >
        <div>
          <NavLink className={classes.logoNav} exact to="/">
            <Box display="flex" alignItems="center">
              <SpindolLogoIcon />
            </Box>
          </NavLink>
        </div>
        {isAuth ? <AuthList /> : <NonAuthList />}
      </Box>
    </AppBar>
  );
}
