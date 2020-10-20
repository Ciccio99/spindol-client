import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useUserState } from 'context/userContext';
import { ADMIN_ROLE } from 'constants/Roles';
import COLORS from 'constants/colors';

const useStyles = makeStyles((theme) => ({
  navLink: {
    color: COLORS.LIGHT_GRAY,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  activeNavLink: {
    color: COLORS.RED,
  },
  linkDiv: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const DesktopMenu = () => {
  const user = useUserState();

  if (user._id) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <NavItem to="/dashboard" label="Dashboard" icon={DashboardIcon} />
        <NavItem to="/daily-diary" label="Daily Diary" icon={AssignmentIcon} />
        <NavItem to="/data" label="Data" icon={AssessmentIcon} />
        {
          user?.role === ADMIN_ROLE && <NavItem to="/team" label="Team" icon={GroupWorkIcon} />
        }
      </Box>
    );
  }

  return null;
};

const NavItem = ({to, label, icon}) => {
  const classes = useStyles();
  return (
    <NavLink to={to} className={clsx(classes.navLink)} activeClassName={clsx(classes.activeNavLink)}>
      <div className={clsx(classes.linkDiv)}>
        <Typography variant="subtitle2" noWrap>{label}</Typography>
      </div>
    </NavLink>
  )
};

export default DesktopMenu;
