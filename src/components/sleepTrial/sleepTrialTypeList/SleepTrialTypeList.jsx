import React from 'react';
import {
  Box,
  Divider,
  Typography,
} from '@material-ui/core';
import SleepTrialCard from '../SleepTrialCard';
import styles from './SleepTrialTypeList.module.css';

const SleepTrialTypeList = ({ type, sleepTrials }) => (
  <>
    <Box p={3}>
      <Typography className={styles.typeHeader} variant="h5">
        {type}
        {' '}
        Trials
      </Typography>
      {
        sleepTrials.map((sleepTrial, index) => (
          <Box key={sleepTrial._id}>
            <SleepTrialCard key={sleepTrial._id} sleepTrial={sleepTrial} />
            { index < sleepTrials.length - 1 && <Divider /> }
          </Box>
        ))
      }
    </Box>
    <Divider />
  </>

);

export default React.memo(SleepTrialTypeList);
