import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import LinkText from '../../linkText/LinkText';
import LinkOnClick from '../../linkOnClick/LinkOnClick';
import DeviceServices from '../../../services/DeviceServices';

const capFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const DeviceSettingsItem = ({ user, device, trackerType, userFirstName}) => {
  const [connected, setConnected] = useState(false);
  const [redirectUri, setRedirectUri] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await DeviceServices.getRedirectUri(device);
      if (data) {
        setRedirectUri(data);
      }
    }
    fetchData();
  }, [device]);

  useEffect(() => {
    if (user.accounts[device].connected) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [user, device])

  const disconnectDevice = async () => {
    const success = await DeviceServices.revokeDeviceAccess(device);
    if (success) {
      setConnected(false);
    } else {
      console.log('Failed to disconnect device');
    }
  };

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
            ? <LinkOnClick onClick={disconnectDevice}>Disconnect</LinkOnClick>
            : <LinkText to={redirectUri} external>Connect</LinkText>
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeviceSettingsItem;
