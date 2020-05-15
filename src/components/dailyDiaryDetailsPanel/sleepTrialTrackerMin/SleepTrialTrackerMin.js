import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Typography
} from '@material-ui/core';
import moment from 'moment-timezone';
import ToggleButtonGroup from '../../buttons/toggleButton/ToggleButtonGroup';
import ToggleButton from '../../buttons/toggleButton/ToggleButton';
import SleepTrialTrackerServices from '../../../services/SleepTrialTrackerServices';
import SleepTrialTrackersContext from '../../../context/sleepTrialTrackersContext';

const SleepTrialTrackerMin = ({ sleepTrialTracker, date }) => {
  const { dispatchSleepTrialTrackers } = useContext(SleepTrialTrackersContext);
  const [completed, setCompleted] = useState(null);
  const [yesterdayDate] = useState(moment.utc(date).subtract(1, 'day'));

  useEffect(() => {
    const existingCheckIn = sleepTrialTracker.checkIns.find((checkIn) => {
      const checkInDate = moment.utc(checkIn.date);
      return checkInDate.isSame(yesterdayDate, 'day');
    })
    if (existingCheckIn) {
      setCompleted(existingCheckIn.completed);
    }
  }, [sleepTrialTracker, yesterdayDate]);

  const submitCheckIn = async (completed) => {
    const updateStt = await SleepTrialTrackerServices.addCheckIn(
      sleepTrialTracker._id,
      yesterdayDate.format('YYYY-MM-DD'),
      completed
    );
    if (updateStt) {
      dispatchSleepTrialTrackers({
        type: 'UPDATE',
        sleepTrialTracker,
      });
      return true;
    }
    return false;
  }

  return (
    <Box boxShadow={2} borderRadius={10} p={2} mt={3}>
      <Grid container spacing={2} justify='space-between' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1'>{sleepTrialTracker.sleepTrial.name}</Typography>
          {/* <Typography variant='subtitle2' display='inline'>Did you perform this trial?</Typography> */}
          <Grid container spacing={1} alignItems='center'>
            <Grid item><Typography variant='caption'>The night of <strong>{yesterdayDate.format('MMM D, YYYY')}</strong></Typography></Grid>
          </Grid>
        </Grid>
        <ToggleButtonGroup item container xs={12} sm={6} spacing={1} justify='space-around' alignItems='center' onChange={submitCheckIn} value={completed}>
          <ToggleButton xs={6} sm={5} value={true}>Yes, I did</ToggleButton>
          <ToggleButton xs={6} sm={5} value={false}>No, I didn't</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Box>
  );
};

export default SleepTrialTrackerMin;
