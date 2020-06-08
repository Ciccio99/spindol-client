import React from 'react';
import {
  Box,
  Divider,
  Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import styles from './SleepTrialTracker.module.css';

const TypeList = ({ type, trialTrackers, component }) => {
  const Component = component;
  const today = moment.utc();

  return (
    <>
      <Divider />
      <Box p={4} mt={2}>
        <Typography className={styles.typeListHeader} variant="h6">
          {type}
          {' '}
          Trials
        </Typography>
        {
          trialTrackers.map((trialTracker, index) => (
            (trialTracker.completed && !today.isSame(moment.utc(trialTracker.date), 'day'))
              ? null
              : (
                <Box key={trialTracker._id}>
                  <Component trialTracker={trialTracker} />
                  {index !== trialTrackers.length - 1 && <Box mt={5}><Divider /></Box>}
                </Box>
              )
          ))
        }
      </Box>

    </>

  );
};

export default TypeList;
