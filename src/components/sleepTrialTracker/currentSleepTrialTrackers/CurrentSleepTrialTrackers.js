import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import Typograph from '@material-ui/core/Typography';
import TypeList from '../typeList/TypeList';
import styles from './CurrentSleepTrialTrackers.module.css';
import Typography from '@material-ui/core/Typography';

const CurrentSleepTrialTrackers = ({ trialTrackers }) => {
  const trialTypes = {
    Behavior: [],
    Hardware: [],
    Supplement: [],
    Environment: [],
  };

  trialTrackers.forEach(trialTracker => {
    trialTypes[trialTracker.sleepTrial.type].push(trialTracker);
  });

  console.log(trialTypes);

  return (
    <Paper className={styles.paper} elevation={0}>
      <Box pl={3} pt={4} pr={3} pb={3}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='flex-start'
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
            <Typography variant='h5'>
              Your current sleep trials
            </Typography>
            <p className={styles.heroSubText}>This is where you can track your progress towards completing sleep trials.</p>
          </Grid>
          <Grid item xs={12} sm={3}>View all check-ins</Grid>
        </Grid>
      </Box>
      {
        Object.keys(trialTypes).map((key) => {
          const trialTrackers = trialTypes[key];
          return trialTrackers.length > 0
            ? <TypeList key={key} type={key} trialTrackers={trialTypes[key]}/>
            : null;
        })
      }
    </Paper>
  );
};

export default CurrentSleepTrialTrackers;
