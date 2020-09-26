import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Typography,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useUserState } from 'context/userContext';
import styles from './Navigation.module.css';
import { ADMIN_ROLE } from 'constants/Roles';

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
  const Icon = icon;
  return (
      <NavLink to={to} className={styles.navLink} activeClassName={styles.navLinkActive}>
      <Box p={2} pb={1} display="flex" justifyContent="center" alignItems="center">
        { icon && <Icon style={{ paddingRight: '8px' }}/>}
        <Typography variant="subtitle1" noWrap>{label}</Typography>
      </Box>
    </NavLink>
  )
};

export default DesktopMenu;
