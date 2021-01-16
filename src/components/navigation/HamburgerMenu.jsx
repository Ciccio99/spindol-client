import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Box,
  Menu,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { useUserState, useUserDispatch } from 'context/userContext';
import UserServices from 'services/UserServices';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import styles from './Navigation.module.css';

const HamburgerMenu = () => {
  const user = useUserState();
  const dispatchUser = useUserDispatch();
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    (async () => {
      try {
        await UserServices.logout();
        handleClose();
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
    <Box display="flex" justifyContent="flex-end">
      <Button aria-controls="header-menu" aria-haspopup="true" onClick={handleClick} disableRipple>
        <MenuRoundedIcon fontSize="large" />
      </Button>
      <Menu
        id="header-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transitionDuration={200}
        variant="selectedMenu"
        elevation={2}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {
          !user._id
            ? ([
              <NavLink key="signin" to="signin" className={styles.navLink} activeClassName={styles.navLinkActive}>
                <MenuItem onClick={handleClose}>
                  <Typography variant="subtitle1">Sign In</Typography>

                </MenuItem>
              </NavLink>,
              <MenuItem key="requestAccess" onClick={handleClose}>
                <Button variant="contained" disableElevation color="primary" size="small" href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
                  <Typography variant="subtitle1">Request Access</Typography>
                </Button>
              </MenuItem>,
            ])
            : [
              <NavLink key="settings" to="/settings" className={styles.navLink} activeClassName={styles.navLinkActive}>
                <MenuItem key="settings" onClick={handleClose}>
                  <Typography variant="subtitle1">Account</Typography>
                </MenuItem>
              </NavLink>,
              <MenuItem key="feedback">
                <a className={styles.navLink} href={`https://sleepwell.typeform.com/to/zNgvJ7?email=${user.email}`} target="_blank" rel="noopener noreferrer">
                  <Typography variant="subtitle1" className={styles.navLink}>Feedback</Typography>
                </a>
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogoutClick}>
                <Typography variant="subtitle1" className={styles.navLink} color="error">Logout</Typography>
              </MenuItem>,
            ]
        }
      </Menu>
    </Box>
  );
};

export default React.memo(HamburgerMenu);
