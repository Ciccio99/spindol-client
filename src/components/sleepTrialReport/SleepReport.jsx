import React, { useState, useEffect } from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  Divider,
  Paper,
} from '@material-ui/core';
import SleepQualityBar from 'components/chart/SleepQualityBar';
import SleepCheckInStats from './SleepCheckInStats';
import styles from './SleepTrialReport.module.css';

const SleepReport = ({ dailyDiaries, sleepTrialTracker }) => {
  const [sleepSummaries, setSleepSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (!dailyDiaries) {
      setIsLoading(false);
      return;
    }
    const ssArr = dailyDiaries
      .filter((dd) => dd.sleepSummary)
      .map((dd) => dd.sleepSummary);
    setSleepSummaries(ssArr);
    setIsLoading(false);
  }, [dailyDiaries]);

  if (isLoading) {
    return (
      <Box>
        <LinearProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Paper elevation={24}>
      <Box>
        <Box p={4} py={3}>
          <Typography variant="h6">Sleep</Typography>
        </Box>
        <Divider />
        <Box p={4}>
          <SleepQualityBar sleepSummaries={sleepSummaries} />
          <Box mt={8}>
            <SleepCheckInStats
              sleepSummaries={sleepSummaries}
              sleepTrialTracker={sleepTrialTracker}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default SleepReport;
