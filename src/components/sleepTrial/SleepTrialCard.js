import React, { userContext, useContext }from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import styles from './SleepTrialCard.module.css'
import UserContext from '../../context/userContext';
import SleepTrialTrackerServices from '../../services/SleepTrialTrackerServices';

const SleepTrialCard = ({ sleepTrial }) => {
  const { user } = useContext(UserContext);

  const startSleepTrial = async () => {
    try {
      const trialTracker = await SleepTrialTrackerServices.create(user, sleepTrial);
      console.log(trialTracker);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mt={3} mb={2}>
      <Grid container justify='space-between'>
        <Grid item xs={12} sm={8}>
          <Box>
            <Typography variant='h6' paragraph>{sleepTrial.name}</Typography>
            <Typography variant='body2' paragraph>{sleepTrial.description}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box mb={2}>
            <Typography variant='subtitle2' className={styles.trialLength}>{sleepTrial.trialLength} day trial period</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography variant='caption'><strong>Directions:</strong> {sleepTrial.directions}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={3} mt={2}>
            <Button onClick={startSleepTrial} className={styles.startTrialButton} variant='outlined' size='large' disableElevation>
              Start sleep trial
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SleepTrialCard;
