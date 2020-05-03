import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Menu,
  MenuItem,
  Link
} from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import LinkText from '../../components/linkText/LinkText';
import logo from '../../assets/sleepwell-logo.png'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  }

  return (
    <AppBar position='sticky' elevation={0} color='default'>
      <Box mt={1}>
        <Toolbar>
          <Grid container alignContent='center' justify='space-between'>
            <Grid item>
              <NavLink exact to='/'>
                <img src={logo} alt='SleepWell Logo' height='50px'/>
              </NavLink>
            </Grid>
            <Grid item>
              <Grid container alignItems='center' justify='space-around'>
                <Grid item>
                  <Box m={1.5}>
                    <LinkText to='/dashboard'>Dashboard</LinkText>
                  </Box>
                </Grid>
                <Grid item><Box m={1.5}>
                  <LinkText to='/checkins'>Check-Ins</LinkText>
                </Box></Grid>
                <Grid item><Box m={1.5}>
                  <Link onClick={handleClick}>
                    <MenuRoundedIcon/>
                  </Link>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <LinkText to='/dashboard'>Dashboard</LinkText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <LinkText to='/checkins'>Check-Ins</LinkText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <LinkText to='/settings'>Account</LinkText>
                    </MenuItem>
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
