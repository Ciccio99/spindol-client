import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
} from '@material-ui/core';
import MoodDoughnut from 'components/chart/MoodDoughnut';
import MoodLine from 'components/chart/MoodLine';
import styles from './SleepTrialReport.module.css';

const MoodReport = ({ dailyDiaries, checkIns }) => (
  <Paper elevation={24}>
    <Box p={4} py={3}>
      <Typography variant="h6">Mood</Typography>
    </Box>
    <Divider />
    <Box p={4}>
      <Grid container spacing={2} justify="center">
        <Grid item sm={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center" p={2} pt={1}>
            <Box mb={1}>
              <Typography variant="subtitle2">Mood Count</Typography>
            </Box>
            <MoodDoughnut dailyDiaries={dailyDiaries} />
          </Box>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center" pt={1} height="100%">
            <Box mb={1}>
              <Typography variant="subtitle2">Mood Throughout Trial</Typography>
            </Box>
            <MoodLine dailyDiaries={dailyDiaries} checkIns={checkIns} />
          </Box>
        </Grid>

      </Grid>
    </Box>
  </Paper>
);

export default MoodReport;
