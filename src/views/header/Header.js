import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Menu,
  MenuItem,
  Button,
  Fade,
  Collapse
} from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import LinkText from '../../components/linkText/LinkText';
import LinkOnClick from '../../components/linkOnClick/LinkOnClick';
import logo from '../../assets/sleepwell-logo.png'
import UserContext from './../../context/userContext';
import UserServices from '../../services/UserServices';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const { user, dispatchUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogoutClick = () => {
    async function logout() {
      try {
        await UserServices.logout();
        dispatchUser({
          type: 'USER_LOGOUT',
        });
        handleClose();
      } catch (error) {
        // TODO WArning popup
        console.error(error);
      }
    }
    logout();
    history.push('/login');
  };

  return (
    <AppBar position='sticky' elevation={0} color='default'>
      <Box mt={1}>
        <Toolbar>
          <Grid container alignItems='center' justify='space-between'>
            <Grid item>
              <NavLink exact to='/'>
                <img src={logo} alt='SleepWell Logo' height='60px'/>
              </NavLink>
            </Grid>
            <Grid item>
              <Grid container alignItems='center' justify='space-around'>
                {/* <Grid item>
                  <Box m={1.5}>
                    <LinkText to='/dashboard'>Dashboard</LinkText>
                  </Box>
                </Grid>
                <Grid item><Box m={1.5}>
                  <LinkText to='/checkins'>Check-Ins</LinkText>
                </Box></Grid> */}
                <Grid item><Box m={1.5}>
                  <Button aria-controls='header-menu' aria-haspopup='true' onClick={handleClick}>
                    <MenuRoundedIcon fontSize='large'/>
                  </Button>
                  <Menu
                    id='header-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transitionDuration={250}
                    variant='selectedMenu'
                    elevation={2}
                    transformOrigin={{ vertical: 'top', horizontal: 'center',}}
                  >
                    {
                      !user._id
                      ? <MenuItem onClick={handleClose}>
                          <LinkText to='/login'>Login</LinkText>
                        </MenuItem>
                      :[
                          <MenuItem key='dashboard' onClick={handleClose}>
                            <LinkText to='/dashboard'>Dashboard</LinkText>
                          </MenuItem>,
                          <MenuItem key='checkins' onClick={handleClose}>
                            <LinkText to='/checkins'>Check-Ins</LinkText>
                          </MenuItem>,
                          <MenuItem key='settings' onClick={handleClose}>
                            <LinkText to='/settings'>Account</LinkText>
                          </MenuItem>,
                          <MenuItem key='logout' onClick={handleLogoutClick}>
                            <LinkOnClick >Logout</LinkOnClick>
                          </MenuItem>,
                      ]
                    }
                  </Menu>
                </Box></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Header;
