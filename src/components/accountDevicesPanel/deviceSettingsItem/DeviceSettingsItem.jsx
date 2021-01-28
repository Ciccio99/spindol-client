import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import { Event } from 'utils/Tracking';
import LinkText from '../../common/LinkText';
import LinkOnClick from '../../linkOnClick/LinkOnClick';
import DeviceServices from '../../../services/DeviceServices';

const capFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const DeviceSettingsItem = ({ user, device, trackerType, userFirstName }) => {
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [connected, setConnected] = useState(false);
  const [redirectUri, setRedirectUri] = useState('');
  const deviceName = React.useMemo(() => capFirst(device), [device]);
  const trackerTypeName = React.useMemo(() => capFirst(trackerType), [
    trackerType,
  ]);

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
  }, [user, device]);

  const disconnectDevice = async () => {
    const success = await DeviceServices.revokeDeviceAccess(device);
    Event('Account', 'Disconnect Tracker', `${device}`);
    if (success) {
      setConnected(false);
      dispatchAlertSystem({
        type: 'SUCCESS',
        message: `${deviceName} disconnected.`,
      });
    } else {
      dispatchAlertSystem({
        type: 'ERROR',
        message: 'Failed to disconnect device. Please try again later.',
      });
    }
  };

  return (
    <Box p={1}>
      <Grid container justify="space-between" alignItems="center" spacing={2}>
        <Grid item>
          {connected ? (
            <Typography variant="h6">
              {userFirstName ? `${userFirstName}'s ` : ''}
              {deviceName} {trackerTypeName}
            </Typography>
          ) : (
            <Typography variant="h6">
              {deviceName} {trackerTypeName}
            </Typography>
          )}
          {connected ? (
            <Typography variant="caption" color="primary">
              <strong>Connected</strong>
            </Typography>
          ) : (
            <Typography variant="caption" color="secondary">
              <strong>Not Connected</strong>
            </Typography>
          )}
        </Grid>
        <Grid item>
          {connected ? (
            <LinkOnClick onClick={disconnectDevice} errorColor>
              Disconnect
            </LinkOnClick>
          ) : (
            <LinkText
              to={redirectUri}
              external
              onClick={(e) => {
                e.preventDefault();
                Event('Account', 'Connecting Tracker Device', `${device}`);
              }}
            >
              Connect
            </LinkText>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeviceSettingsItem;
