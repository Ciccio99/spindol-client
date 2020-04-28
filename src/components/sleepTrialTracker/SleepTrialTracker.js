import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from './SleepTrialTracker.module.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '32px',
    overflow: 'hidden',
    position: 'relative',
    'border-radius': '50px',
  },
  colorPrimary :{
    'background-color': '#EBEBEB',
  },
  barColorPrimary: {
    'background': 'linear-gradient(90deg, rgba(250,200,86,1) 0%, rgba(215,70,78,1) 100%)'
  }
});

const SleepTrialTracker = ({ trialTracker }) => {
  const classes = useStyles();
  const completedCheckIns = trialTracker.checkIns.filter((checkIn) => {
    return checkIn.completed !== false;
  });

  const completionProgress = Math.ceil((completedCheckIns.length / trialTracker.trialLength) * 100);

  return (
    <Grid container justify='space-between'>
      <Grid item xs={12}>
        <LinearProgress
          variant='determinate'
          value={completionProgress}
          classes={{
            root: classes.root,
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
          />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box pt={2}>
          <h3 className={styles.trialName}>{trialTracker.sleepTrial.name}</h3>
          <p className={styles.trialDescription}>{trialTracker.sleepTrial.description}</p>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Box pt={2}>
          <ul className={styles.list}>
            <li className={styles.completion}>{completionProgress}% complete</li>
            <li className={styles.trialLength}>{trialTracker.trialLength} day trial period</li>
          </ul>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SleepTrialTracker;
