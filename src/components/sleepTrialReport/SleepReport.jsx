import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  Divider,
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
    <Box className={styles.panel} mt={5} pb={2} borderRadius={10}>
      <Box p={2}>
        <Typography variant="h6">Sleep</Typography>
      </Box>
      <Divider />
      <Box mt={1} p={1}>
        <Box p={1} mt={2}>
          <SleepQualityBar sleepSummaries={sleepSummaries} />
        </Box>
        <SleepCheckInStats
          sleepSummaries={sleepSummaries}
          sleepTrialTracker={sleepTrialTracker}
        />
      </Box>
    </Box>

  );
};

export default SleepReport;
