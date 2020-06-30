import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import AccountDevicesPanel from 'components/accountDevicesPanel/AccountDevicesPanel';
import AccountDetailsPanel from 'components/accountsDetailsPanel/AccountDetailsPanel';
import Section from 'components/organizers/Section';

const AccountSettings = () => (
  <Container>
    <Helmet>
      <title>Hypnos.ai - Account Settings</title>
      <meta
        name="description"
        content="Hypnos.ai helps you track and improve your sleep habits. Settings for your account details, such as name, email, connecting sleep trackers."
      />
    </Helmet>
    <Box mt={5}>
      <Typography variant="h3">Your Account</Typography>
    </Box>
    <Section>
      <AccountDevicesPanel />
    </Section>
    <Section>
      <AccountDetailsPanel />
    </Section>
  </Container>
);

export default AccountSettings;
