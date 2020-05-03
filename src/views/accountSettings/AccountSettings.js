import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import AccountDevicesPanel from '../../components/accountDevicesPanel/AccountDevicesPanel';
import styles from './AccountSettings.module.css';

const AccountSettings = () => {

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant='h3'>Your Account</Typography>
      </Box>
      <Box borderRadius={20}>
        <Paper>
          Account Info
        </Paper>
      </Box>
      <AccountDevicesPanel/>
    </Container>
  );
};

export default AccountSettings;

