import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import AccountDevicesPanel from 'components/accountDevicesPanel/AccountDevicesPanel';
import AccountDetailsPanel from 'components/accountsDetailsPanel/AccountDetailsPanel';
import Section from 'components/organizers/Section';

const AccountSettings = () => (
  <Container>
    <Box mt={4}>
      <Typography variant="h3">Your Account</Typography>
    </Box>
    <Section>
      <AccountDetailsPanel />
    </Section>
    <Section>
      <AccountDevicesPanel />
    </Section>
  </Container>
);

export default AccountSettings;
