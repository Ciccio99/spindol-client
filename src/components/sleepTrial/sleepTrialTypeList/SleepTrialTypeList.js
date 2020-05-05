import React from 'react';
import {
  Box,
  Divider,
} from '@material-ui/core';
import SleepTrialCard from '../SleepTrialCard';
import styles from './SleepTrialTypeList.module.css';

const SleepTrialTypeList = ({ type, sleepTrials}) => {

  return (
    <React.Fragment>
      <Box p={3}>
        <h4 className={styles.typeHeader}>{type} Trials</h4>
        {sleepTrials.map((sleepTrial) =>
          <SleepTrialCard key={sleepTrial._id} sleepTrial={sleepTrial}/>)}
      </Box>
      <Divider/>
    </React.Fragment>

  );
}

export default SleepTrialTypeList;