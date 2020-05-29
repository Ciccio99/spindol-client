import React from 'react';
import {
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import moment from 'moment-timezone';
import styles from './SleepTrialReport.module.css';

const InformationReport = ({ sleepTrialTracker }) => (
  <Box className={styles.panel} p={2} mt={6} borderRadius={10}>
    <Grid container justify="space-between" spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5">
          {sleepTrialTracker.sleepTrial.name}
        </Typography>
        <Typography variant="subtitle1">
          {`${sleepTrialTracker.sleepTrial.type} trial`}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="body1">
          {'Started: '}
          {moment(sleepTrialTracker.startDate).format('MMM DD, YYYY')}
        </Typography>
        <Typography variant="body1">
          {'Ended: '}
          {moment(sleepTrialTracker.endDate).format('MMM DD, YYYY')}
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

export default InformationReport;
