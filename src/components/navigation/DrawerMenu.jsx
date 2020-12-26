import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  SwipeableDrawer,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useUserState } from 'context/userContext';
import LogoutWrapper from 'components/LogoutWrapper';
import { MenuIcon } from 'components/common/Icons';
import COLORS from 'constants/colors';

const useStyles = makeStyles(() => ({
  buttonRoot: {
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  navLink: {
    color: COLORS.GRAY,
    textDecoration: 'none',
    cursor: 'pointer',
  },
}));

const DrawerMenu = () => {
  const classes = useStyles();
  const user = useUserState();
  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setAnchor(open);
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button classes={{ root: classes.buttonRoot }} aria-controls="header-menu" aria-haspopup="true" onClick={toggleDrawer(true)} disableRipple>
        <MenuIcon />
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

const AuthList = ({ onToggle, user }) => {
  const classes = useStyles();

  return (
    <Box
      role="presentation"
      onClick={onToggle(false)}
      onKeyDown={onToggle(false)}
    >
      <List>
        <ListItem button component={NavLink} to="/settings">
          <ListItemText className={clsx(classes.navLink)}>Account</ListItemText>
        </ListItem>
        {/* <ListItem button component="a" href={`https://sleepwell.typeform.com/to/zNgvJ7?email=${user.email}`} target="_blank" rel="noopener noreferrer">
          <ListItemText className={clsx(classes.navLink)}>Feedback</ListItemText>
        </ListItem> */}
        <ListItem button component="a" href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
          <ListItemText className={clsx(classes.navLink)}>Community</ListItemText>
        </ListItem>
        <Divider />
        <LogoutWrapper>
          <ListItem button>
            <ListItemText className={clsx(classes.navLink)}>Logout</ListItemText>
          </ListItem>
        </LogoutWrapper>
      </List>
    </Box>
  );
};
const NonAuthList = ({ onToggle }) => {
  const classes = useStyles();
  return (
    <Box
      role="presentation"
      onClick={onToggle(false)}
      onKeyDown={onToggle(false)}
    >
      <List>
        <ListItem button component={NavLink} to="/signin" color="primary">
          <ListItemText className={clsx(classes.navLink)}>Sign In</ListItemText>
        </ListItem>
        <ListItem button component="a" href="https://community.hypnos.ai" target="_blank" rel="noopener noreferrer">
          <ListItemText className={clsx(classes.navLink)}>Community</ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

export default React.memo(DrawerMenu);
