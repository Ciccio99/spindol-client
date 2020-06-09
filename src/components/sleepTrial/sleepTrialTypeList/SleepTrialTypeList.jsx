import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import styles from './SleepTrialTypeList.module.css';

const SleepTrialTypeList = ({ type, sleepTrials }) => (
  <Box p={4}>
    <Typography className={styles.typeHeader} variant="h5">
      {type}
      {' '}
      Trials
    </Typography>
    { sleepTrials }
  </Box>
);

export default React.memo(SleepTrialTypeList);
