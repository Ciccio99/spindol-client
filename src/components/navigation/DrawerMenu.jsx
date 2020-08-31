import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
  Typography,
} from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ForumIcon from '@material-ui/icons/Forum';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PersonIcon from '@material-ui/icons/Person';
import { useUserState } from 'context/userContext';
import LogoutWrapper from 'components/LogoutWrapper';
import styles from './Navigation.module.css';
import { Event } from 'utils/Tracking';

const DrawerMenu = () => {
  const user = useUserState();
  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = (open) => (event) => {
    Event('Drawer Menu', 'Toggled');
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setAnchor(open);
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button aria-controls="header-menu" aria-haspopup="true" onClick={toggleDrawer(true)} disableRipple>
        <MenuRoundedIcon fontSize="large" />
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={anchor}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {
          user._id
            ? <AuthList onToggle={toggleDrawer} user={user} />
            : <NonAuthList onToggle={toggleDrawer} />

        }
      </SwipeableDrawer>
    </Box>
  );
};

const AuthList = ({ onToggle, user }) => (
  <Box
    role="presentation"
    onClick={onToggle(false)}
    onKeyDown={onToggle(false)}
  >
    <List>
      <ListItem button component={NavLink} to="/settings">
        <ListItemIcon><PersonIcon className={styles.navLink} /></ListItemIcon>
        <ListItemText className={styles.navLink}>Account</ListItemText>
      </ListItem>
      <ListItem button component="a" href={`https://sleepwell.typeform.com/to/zNgvJ7?email=${user.email}`} target="_blank" rel="noopener noreferrer">
        <ListItemIcon><FeedbackIcon className={styles.navLink} /></ListItemIcon>
        <ListItemText className={styles.navLink}>Feedback</ListItemText>
      </ListItem>
      <ListItem button component="a" href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
        <ListItemIcon><ForumIcon className={styles.navLink} /></ListItemIcon>
        <ListItemText className={styles.navLink}>Community</ListItemText>
      </ListItem>
      <Divider />
      <LogoutWrapper>
        <ListItem button>
          <ListItemIcon><ExitToAppIcon className={styles.logout} /></ListItemIcon>
          <ListItemText className={styles.logout}>Logout</ListItemText>
        </ListItem>
      </LogoutWrapper>
    </List>
  </Box>
);

const NonAuthList = ({ onToggle }) => (
  <Box
    role="presentation"
    onClick={onToggle(false)}
    onKeyDown={onToggle(false)}
  >
    <List>
      <ListItem button component={NavLink} to="/signin" color="primary">
        <ListItemIcon><ExitToAppIcon className={styles.navLink} /></ListItemIcon>
        <ListItemText className={styles.navLink}>Sign In</ListItemText>
      </ListItem>
      <ListItem button component="a" href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
        <ListItemIcon><ForumIcon className={styles.navLink} /></ListItemIcon>
        <ListItemText className={styles.navLink}>Community</ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <Button variant="contained" disableElevation color="primary" size="small" href="https://sleepwell.typeform.com/to/FnZPZk" target="_blank" rel="noopener noreferrer">
          <Typography variant="subtitle1">Request Access</Typography>
        </Button>
      </ListItem>
    </List>
  </Box>
);

export default React.memo(DrawerMenu);
