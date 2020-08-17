import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavAction from 'components/BottomNavAction';
import { useUserState } from 'context/userContext';
import { ADMIN_ROLE } from 'constants/Roles';

const useStyles = makeStyles((theme) => ({
  bottomNav: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1,
    backgroundColor: theme.palette.tertiary.main,
  },
}));

const pathMap = [
  '/dashboard',
  '/data',
  '/daily-diary',
  '/team',
];

const BottomNav = () => {
  const user = useUserState();
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const index = pathMap.indexOf(location.pathname);
    if (value !== index) {
      setValue(index);
    }
  }, [location, value]);

  if (user._id) {
    return (
      <BottomNavigation
        className={classes.bottomNav}
        value={value}
        onChange={(e, newValue) => { setValue(newValue); }}
        showLabels
      >
        <BottomNavAction label="Dashboard" icon={<DashboardIcon />} disableRipple component={NavLink} to={pathMap[0]} />
        <BottomNavAction label="Data" icon={<AssessmentIcon />} disableRipple component={NavLink} to={pathMap[1]} />
        <BottomNavAction label="Diary" icon={<AssignmentIcon />} disableRipple component={NavLink} to={pathMap[2]} />
        { user.role === ADMIN_ROLE && <BottomNavAction label="Team" icon={<GroupWorkIcon />} disableRipple component={NavLink} to={pathMap[3]} />}
      </BottomNavigation>
    );
  }

  return null;
};

export default BottomNav;
