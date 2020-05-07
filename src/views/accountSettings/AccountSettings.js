import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import AccountDevicesPanel from '../../components/accountDevicesPanel/AccountDevicesPanel';
import AccountDetailsPanel from '../../components/accountsDetailsPanel/AccountDetailsPanel';

const AccountSettings = () => {

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant='h3'>Your Account</Typography>
      </Box>
      <AccountDetailsPanel/>
      <AccountDevicesPanel/>
    </Container>
  );
};

export default AccountSettings;

