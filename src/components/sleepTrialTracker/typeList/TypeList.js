import React from 'react';
import {
  Box,
  Divider,
  Typography,
} from '@material-ui/core';
import SleepTrialTracker from '../SleepTrialTracker';
import styles from './TypeList.module.css';

const TypeList = ({ type, trialTrackers}) => {

  return (
    <React.Fragment>
      <Divider/>
      <Box p={3}>
        <Typography className={styles.typeHeader} variant='h6'>{type} Trials</Typography>
        {/* <h4 className={styles.typeHeader}>{type} Trials</h4> */}
        {trialTrackers.map((trialTracker) =>
          trialTracker.completed
          ? null
          : <SleepTrialTracker key={trialTracker._id} trialTracker={trialTracker}/>)
        }
      </Box>

    </React.Fragment>

  );
}

export default TypeList;
