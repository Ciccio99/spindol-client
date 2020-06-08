import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
} from '@material-ui/core';
import AccountInfoPanel from './accountInfoPanel/AccountInfoPanel';
import AccountPasswordPanel from './accountPasswordPanel/AccountPasswordPanel';

const AccountDetailsPanel = () => (
  <Paper elevation={24}>
    <Box px={4} py={3}>
      <Typography variant="h6">Account Info</Typography>
    </Box>
    <Divider />
    <Box p={4}>
      <AccountInfoPanel />
      <Divider />
      <AccountPasswordPanel />
    </Box>
  </Paper>
);

export default AccountDetailsPanel;
