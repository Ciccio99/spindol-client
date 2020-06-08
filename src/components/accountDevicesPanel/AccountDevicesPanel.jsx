import React, { useContext } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
} from '@material-ui/core';
import DeviceSettingsItem from './deviceSettingsItem/DeviceSettingsItem';
import UserContext from '../../context/userContext';

const AccountDevicesPanel = () => {
  const { user } = useContext(UserContext);
  const userFirstName = user.name ? user.name.split(' ')[0] : '';
  return (
    <Paper elevation={24}>
      <Box px={4} py={3}>
        <Typography variant="h6">Your Sleep Trackers</Typography>
      </Box>
      <Divider />
      <Box p={4}>
        <DeviceSettingsItem
          user={user}
          device="oura"
          trackerType="Ring"
          userFirstName={userFirstName ? ` ${userFirstName}` : ''}
        />
      </Box>
    </Paper>
  );
};

export default AccountDevicesPanel;
