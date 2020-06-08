import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import moment from 'moment-timezone';
import styles from './SleepTrialTracker.module.css';

const CompletedSTT = ({ trialTracker }) => (
  <Box mt={6} p={3} border={1} borderColor="#DBDBDB" borderRadius={25}>
    <Grid container justify="space-between" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={8}>
        <Box>
          <Typography variant="h6">{trialTracker.sleepTrial.name}</Typography>
          <Typography variant="subtitle1">
            {`${moment.utc(trialTracker.startDate).format('MMM DD, YYYY')} - ${moment.utc(trialTracker.endDate).format('MMM DD, YYYY')}`}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Link className={styles.link} to={`/sleep-trial-report/${trialTracker._id}`}>
          <Button color="secondary" size="small" fullWidth variant="outlined" disableElevation>View Report</Button>
        </Link>
      </Grid>
    </Grid>
  </Box>
);

export default CompletedSTT;
