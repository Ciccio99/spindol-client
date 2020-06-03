import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';
import moment from 'moment-timezone';

const InformationReport = ({ sleepTrialTracker }) => (
  <Paper elevation={24}>
    <Box p={4} py={3}>
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
  </Paper>
);

export default InformationReport;
