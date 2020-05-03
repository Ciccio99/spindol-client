import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import LinkText from '../../linkText/LinkText';
import DeviceServices from '../../../services/DeviceServices';
const capFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const DeviceSettingsItem = ({ user, device, trackerType, userFirstName}) => {
  const [connected, setConnected] = useState(false);
  const [redirectUri, setRedirectUri] = useState('');

  useEffect(() => {
    async function fetchData() {
      // Get redirectURI
      const data = await DeviceServices.getRedirectUri(device);
      if (data) {
        setRedirectUri(data);
      }
    }
    fetchData();
  }, [device]);

  useEffect(() => {
    if (user.accounts[device].userId) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [user, device])

  return (
    <Box p={1}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          {
            connected
            ? <Typography variant='h6'>{userFirstName ? userFirstName + "'s " : ''}{capFirst(device)} {capFirst(trackerType)}</Typography>
            : <Typography variant='h6'>{capFirst(device)} {capFirst(trackerType)}</Typography>
          }
          {connected && <Typography variant='caption'>Connected</Typography>}
        </Grid>
        <Grid item>
          {
            connected
            ? <LinkText to=''>Disconnect</LinkText>
            : <LinkText to='http://localhost:3001/api/devices/auth/oura' external>Connect</LinkText>

          }

        </Grid>

      </Grid>
    </Box>
  );
};

export default DeviceSettingsItem;
