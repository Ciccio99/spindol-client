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
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import { Event } from 'utils/Tracking';

const SleepTrialTrackerMin = ({ sleepTrialTracker, date }) => {
  const { dispatchSleepTrialTrackers } = useContext(SleepTrialTrackersContext);
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [trialTracker, setTrialTracker] = useState(sleepTrialTracker);
  const [completed, setCompleted] = useState(null);
  const [yesterdayDate] = useState(moment.utc(date).subtract(1, 'day'));
  const [completedCount, setCompletedCount] = useState(0);
  useEffect(() => {
    const existingCheckIn = trialTracker.checkIns.find((checkIn) => {
      const checkInDate = moment.utc(checkIn.date);
      return checkInDate.isSame(yesterdayDate, 'day');
    });
    if (existingCheckIn) {
      setCompleted(existingCheckIn.completed);
    }
  }, [trialTracker, yesterdayDate]);

  useEffect(() => {
    const completedCheckIns = trialTracker.checkIns
      .filter((checkIn) => checkIn.completed !== false);

    setCompletedCount(completedCheckIns.length);
  }, [trialTracker]);

  const submitCheckIn = async (done) => {
    Event('Sleep Trial Tracker', 'Submit Check In', `${sleepTrialTracker.sleepTrial.name}`);
    const updateStt = await SleepTrialTrackerServices.addCheckIn(
      sleepTrialTracker._id,
      yesterdayDate.format('YYYY-MM-DD'),
      done,
    );
    if (updateStt) {
      setTrialTracker(updateStt);
      dispatchSleepTrialTrackers({
        type: 'UPDATE',
        sleepTrialTracker: updateStt,
      });
      dispatchAlertSystem({
        type: 'SUCCESS',
        message: 'Updated Trial!',
      });
      return true;
    }
    dispatchAlertSystem({
      type: 'WARNING',
      message: 'Failed to update trial. Please try again later.',
    });
    return false;
  };

  return (
    <Box border={1} borderColor="#ccc" borderRadius={25} p={3} mt={3}>
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">{sleepTrialTracker.sleepTrial.name}</Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="caption">
                <strong>Night of {yesterdayDate.format('MMMM DD, YYYY')}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="primary">
                {`${completedCount}/${sleepTrialTracker.trialLength} days completed`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <ToggleButtonGroup item container xs={12} sm={6} spacing={1} justify="space-around" alignItems="center" onChange={submitCheckIn} value={completed}>
          <ToggleButton xs={12} sm={5} value>Yes, I did</ToggleButton>
          <ToggleButton xs={12} sm={5} value={false}>No, I didn't</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Box>
  );
};

export default SleepTrialTrackerMin;
