import React, { useContext } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider
} from '@material-ui/core';
import DeviceSettingsItem from '../accountDevicesPanel/deviceSettingsItem/DeviceSettingsItem';
import UserContext from '../../context/userContext';
import styles from './AccountDevicesPanel.module.css'
const AccountDevicesPanel = () => {
  const { user } = useContext(UserContext);
  const userFirstName = user.name.split(' ')[0];
  console.log(user);
  return (
    <Box mt={4} mb={4} borderRadius={30}>
      <Paper className={styles.paper} elevation={0}>
        <Box p={3} pt={4}>
          <Box mb={5}>
            <Typography variant='h5'>Your connected devices</Typography>
          </Box>
          <Box mt={1} mb={1}>
            <DeviceSettingsItem
              user={user}
              device='oura'
              trackerType='Ring'
              userFirstName={userFirstName ? ' ' + userFirstName : ''}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountDevicesPanel;
