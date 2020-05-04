import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import ToggleButtonGroup from '../../buttons/toggleButton/ToggleButtonGroup';
import ToggleButton from '../../buttons/toggleButton/ToggleButton';
import styles from './TrialTrackerCheckIn.module.css';
import SleepTrialTrackerServices from '../../../services/SleepTrialTrackerServices'
import SleepTrialTrackersContext from '../../../context/sleepTrialTrackersContext';

const TrialTrackerCheckIn = ({ trialTracker }) => {
  const { dispatchSleepTrialTrackers } = useContext(SleepTrialTrackersContext);
  const [completed, setCompleted] = useState(null);
  const yesterdayDate = moment().subtract(1, 'day');

  useEffect(() => {
    const existingCheckIn = trialTracker.checkIns.find((checkIn) => {
      const checkInDate = moment(checkIn.date);
      return moment(checkInDate.utc().format('YYYY-MM-DD')).isSame(moment(yesterdayDate.format('YYYY-MM-DD')), 'day');
    });

    if (existingCheckIn) {
      setCompleted(existingCheckIn.completed);
    }
  }, [trialTracker, yesterdayDate]);

  const submitCheckIn = async (completed) => {
    const sleepTrialTracker = await SleepTrialTrackerServices.addCheckIn(
      trialTracker._id,
      yesterdayDate.format('YYYY-MM-DD'),
      completed
    );
    if (sleepTrialTracker) {
      dispatchSleepTrialTrackers({
        type: 'UPDATE',
        sleepTrialTracker,
      });
    }
  }

  return (
    <Box boxShadow={2} borderRadius={10} p={2}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1'>Did you perform this trial yesterday?</Typography>
          <Grid container spacing={1}>
            <Grid item><Typography variant='caption'>{yesterdayDate.format('MMM D, YYYY')}</Typography></Grid>
            <Grid item><Typography variant='caption'>{trialTracker.sleepTrial.type} Trial</Typography></Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={4} spacing={1} justify='space-around' alignItems='center'>
          <Grid item className={styles.buttonContainer}>
            <ToggleButtonGroup onChange={submitCheckIn} value={completed}>
              <ToggleButton value={true}>Yes, I did</ToggleButton>
              <ToggleButton value={false}>No, I didn't</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrialTrackerCheckIn;
