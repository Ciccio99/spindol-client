import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TrialTrackerCheckIn from './TrialTrackerCheckIn';
import styles from './SleepTrialTracker.module.css';

const useStyles = makeStyles({
  root: {
    height: '32px',
    overflow: 'hidden',
    position: 'relative',
    'border-radius': '50px',
  },
  colorPrimary: {
    'background-color': '#EBEBEB',
  },
  barColorPrimary: {
    background: 'linear-gradient(90deg, rgba(250,200,86,1) 0%, rgba(215,70,78,1) 100%)',
  },
});

const SleepTrialTracker = ({ trialTracker }) => {
  const [completionProgress, setCompletionProgress] = useState(0);
  const [completedDays, setCompletedDays] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const completedCheckIns = trialTracker.checkIns
      .filter((checkIn) => checkIn.completed !== false);

    setCompletedDays(completedCheckIns.length);
    let progress = Math.round((completedCheckIns.length / trialTracker.trialLength) * 100);
    if (progress > 100) {
      progress = 100;
    }
    setCompletionProgress(progress);
  }, [trialTracker]);

  return (
    <Box mt={6}>
      <Grid container justify="space-between" spacing={1}>
        <Grid item xs={12}>
          <LinearProgress
            variant="determinate"
            value={completionProgress}
            classes={{
              root: classes.root,
              colorPrimary: classes.colorPrimary,
              barColorPrimary: classes.barColorPrimary,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box pt={3}>
            <h3 className={styles.trialName}>{trialTracker.sleepTrial.name}</h3>
            <p className={styles.trialDescription}>{trialTracker.sleepTrial.shortDescription}</p>
            <Typography />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box pt={3}>
            <ul className={styles.list}>
              <li className={styles.completion}>
                {`${completedDays}/${trialTracker.trialLength} days complete`}
              </li>
              <li className={styles.trialLength}>
                {trialTracker.trialLength}
                {' '}
                day trial period
              </li>
            </ul>
          </Box>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item><Typography variant="body1">Directions:</Typography></Grid>
          <Grid item><Typography variant="body1"><strong>{trialTracker.sleepTrial.directions}</strong></Typography></Grid>
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            <TrialTrackerCheckIn trialTracker={trialTracker} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SleepTrialTracker;
