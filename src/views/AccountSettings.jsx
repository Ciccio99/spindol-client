import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Divider, Tabs, Tab } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import AccountDevicesPanel from 'components/accountDevicesPanel/AccountDevicesPanel';
import AccountDetailsPanel from 'components/accountsDetailsPanel/AccountDetailsPanel';
import TagManagementPanel from 'components/accountSettings/TagManagementPanel';
import NotificationSettingsModule from 'components/modules/NotificationSettingsModule';
import Section from 'components/common/Section';
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
        case '#notifications':
          setTabValue(2);
          break;
        case '#tags':
          setTabValue(3);
          break;
        default:
          break;
      }
    }
  }, [location]);

  return (
    <Container>
      <Helmet>
        <title>Spindol - Account</title>
      </Helmet>
      <Box
        component={Tabs}
        value={tabValue}
        onChange={(e, newValue) => {
          setTabValue(newValue);
        }}
        variant="scrollable"
        scrollButtons="off"
        indicatorColor="secondary"
        textColor="secondary"
        mt={2}
      >
        <Tab label="Account" disableRipple />
        <Tab label="Devices" disableRipple />
        <Tab label="Notifications" disableRipple />
        <Tab label="Activities" disableRipple />
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
          <NotificationSettingsModule />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <TagManagementPanel />
        </TabPanel>
      </Section>
    </Container>
  );
};

export default AccountSettings;
