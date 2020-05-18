import React from 'react';
import {
  Box,
  Divider,
  Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import styles from './SleepTrialTracker.module.css';

const TypeList = ({ type, trialTrackers, component}) => {
  const Component = component;
  const today = moment.utc();

  return (
    <React.Fragment>
      <Divider/>
      <Box p={3} mt={2}>
        <Typography className={styles.typeListHeader} variant='h6'>{type} Trials</Typography>
        {/* <h4 className={styles.typeHeader}>{type} Trials</h4> */}
        {trialTrackers.map((trialTracker) =>
          (trialTracker.completed && !today.isSame(moment.utc(trialTracker.date), 'day'))
          ? null
          : <Component key={trialTracker._id} trialTracker={trialTracker}/>)
        }
      </Box>

    </React.Fragment>

  );
}

export default TypeList;
