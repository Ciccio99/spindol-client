import React from 'react';
import {
  Box,
  Divider,
  Typography
} from '@material-ui/core';
import SleepTrialCard from '../SleepTrialCard';
import styles from './SleepTrialTypeList.module.css';

const SleepTrialTypeList = ({ type, sleepTrials}) => {

  return (
    <React.Fragment>
      <Box p={3}>
        <Typography className={styles.typeHeader} variant='h6'>{type} Trials</Typography>
        {sleepTrials.map((sleepTrial) =>
          <SleepTrialCard key={sleepTrial._id} sleepTrial={sleepTrial}/>)}
      </Box>
      <Divider/>
    </React.Fragment>

  );
}

export default SleepTrialTypeList;
