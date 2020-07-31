import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import AccountDevicesPanel from 'components/accountDevicesPanel/AccountDevicesPanel';
import AccountDetailsPanel from 'components/accountsDetailsPanel/AccountDetailsPanel';
import TagManagementPanel from 'components/accountSettings/TagManagementPanel';
import Section from 'components/organizers/Section';
import TabPanel from 'components/tabPanel/TabPanel';

const AccountSettings = () => {
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);

  React.useEffect(() => {
    if (location.hash) {
      switch (location.hash) {
        case '#account':
          setTabValue(0);
          break;
        case '#devices':
          setTabValue(1);
          break;
        case '#tags':
          setTabValue(2);
          break;
        default:
          break;
      }
    }
  }, [location]);

  return (
    <Container>
      <Helmet>
        <title>Hypnos.ai - Account Settings</title>
        <meta
          name="description"
          content="Hypnos.ai helps you track and improve your sleep habits. Settings for your account details, such as name, email, connecting sleep trackers."
        />
      </Helmet>
      <Box mt={4}>
        <Typography variant="h5">Account Settings</Typography>
      </Box>
      <Box
        component={Tabs}
        value={tabValue}
        onChange={(e, newValue) => { setTabValue(newValue); }}
        indicatorColor="primary"
        textColor="primary"
        mt={4}
      >
        <Tab label="Account" disableRipple />
        <Tab label="Devices" disableRipple />
        <Tab label="Habit Tags" disableRipple />
      </Box>
      <Divider />
      <Section>
        <TabPanel value={tabValue} index={0}>
          <AccountDetailsPanel />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <AccountDevicesPanel />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <TagManagementPanel />
        </TabPanel>
      </Section>
    </Container>
  );
};

export default AccountSettings;
