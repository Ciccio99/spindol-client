import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import UserContext from 'context/userContext';
import SleepTrialTrackersContext from 'context/sleepTrialTrackersContext';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';
import AlertSystemContext from 'context/alertSystemContext';
import styles from './SleepTrialCard.module.css';

const SleepTrialCard = ({ sleepTrial }) => {
  const { user } = useContext(UserContext);
  const { sleepTrialTrackers, dispatchSleepTrialTrackers } = useContext(SleepTrialTrackersContext);
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [cta, setCta] = useState();



  useEffect(() => {
    const startSleepTrial = async () => {
      const sleepTrialTracker = await SleepTrialTrackerServices.create(sleepTrial);
      if (sleepTrialTracker) {
        dispatchSleepTrialTrackers({
          type: 'ADD',
          sleepTrialTracker,
        });
        dispatchAlertSystem({
          type: 'SUCCESS',
          message: 'Sleep trial started!',
        });
      }
    };

    const tracked = sleepTrialTrackers
      .some((sleepTrialTracker) => (
        sleepTrialTracker.sleepTrial._id === sleepTrial._id
        && !sleepTrialTracker.completed
      ));

    if (tracked) {
      setCta(
        <Button className={styles.startTrialButton} variant="outlined" size="medium" disabled disableElevation>
          Currently being tracked
        </Button>,
      );
    } else {
      setCta(
        <Button onClick={startSleepTrial} className={styles.startTrialButton} variant="outlined" size="large" disableElevation>
          Start sleep trial
        </Button>,
      );
    }
  }, [dispatchSleepTrialTrackers, dispatchAlertSystem, sleepTrial, sleepTrialTrackers, user]);

  return (
    <Box mt={3} mb={2}>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={8}>
          <Box>
            <Typography variant="h6" paragraph>{sleepTrial.name}</Typography>
            <Typography variant="body2" paragraph>{sleepTrial.description}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box mb={2}>
            <Typography variant="subtitle2" className={styles.trialLength}>
              {sleepTrial.trialLength}
              {' '}
              day trial period
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography variant="caption">
              <strong>Directions:</strong>
              {' '}
              {sleepTrial.directions}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={3} mt={2}>
            {cta}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SleepTrialCard;
