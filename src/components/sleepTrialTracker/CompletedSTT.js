import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import moment from 'moment-timezone';
import styles from './SleepTrialTracker.module.css';
import utils from 'utils/SleepTrialTracker';

const CompletedSTT = ({ trialTracker }) => {
  const [avgMood, setAvgMood] = useState();

  useEffect(() => {
    (async () => {
      const mood = await utils.getAvgCompleteMood(trialTracker);
      setAvgMood(mood);
    })();
  }, [trialTracker]);


  return (
    <Box mt={6}>
      <Grid container justify='space-between' spacing={1}>
        <Grid item xs={12} sm={8}>
          <Box>
            <h3 className={styles.trialName}>{trialTracker.sleepTrial.name}</h3>
            <p className={styles.trialDescription}>{trialTracker.sleepTrial.shortDescription}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <ul className={styles.list}>
              <li className={styles.completion}><Typography>Started on: <strong>{moment.utc(trialTracker.startDate).format('ddd MMM DD, YYYY')}</strong></Typography></li>
              <li className={styles.completion}><Typography>Ended on: <strong>{moment.utc(trialTracker.endDate).format('ddd MMM DD, YYYY')}</strong></Typography></li>
            </ul>
          </Box>
        </Grid>
        <Grid item>
          Your overall mood on day where you completed this trial: {avgMood}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompletedSTT;
