import React from 'react';
import {
  Box,
  Typography,
  Divider,
} from '@material-ui/core';
import styles from './AccountDetailsPanel.module.css';
import AccountInfoPanel from './accountInfoPanel/AccountInfoPanel';
import AccountPasswordPanel from './accountPasswordPanel/AccountPasswordPanel';

const AccountDetailsPanel = () => {
  return (
    <Box className={styles.panel} mt={4} mb={4} boxShadow={0} borderRadius={10} p={3}>
      <Box mb={5}>
        <Typography variant='h5'>Account Info</Typography>
      </Box>
      <AccountInfoPanel/>
      <Divider/>
      <AccountPasswordPanel/>
    </Box>
  );
};

export default AccountDetailsPanel;
