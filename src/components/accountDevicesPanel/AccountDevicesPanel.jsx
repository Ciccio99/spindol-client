import React, { useContext } from 'react';
import {
  Box,
  Divider,
} from '@material-ui/core';
import UserContext from 'context/userContext';
import PanelModule from 'components/organizers/PanelModule';
import DeviceSettingsItem from './deviceSettingsItem/DeviceSettingsItem';

const TITLE = 'Your Sleep Trackers';
const SUBTITLE = 'Only one tracker can be connected at a time. If you connect a new tracker, any previously connected trackers will be disconnected.'

const AccountDevicesPanel = () => {
  const { user } = useContext(UserContext);
  const userFirstName = user.name ? user.name.split(' ')[0] : '';
  return (
    <PanelModule title={TITLE} subtitle={SUBTITLE}>

      <DeviceSettingsItem
        user={user}
        device="oura"
        trackerType="Ring"
        userFirstName={userFirstName ? ` ${userFirstName}` : ''}
      />
      <Box my={4}>
        <Divider />
      </Box>
      <DeviceSettingsItem
        user={user}
        device="withings"
        trackerType="Tracker"
        userFirstName={userFirstName ? ` ${userFirstName}` : ''}
      />
    </PanelModule>
  );
};

export default AccountDevicesPanel;
