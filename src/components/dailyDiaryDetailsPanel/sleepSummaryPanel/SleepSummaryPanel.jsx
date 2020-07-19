import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import StatCard from '../../statCar/StatCard';
import SleepSummaryServices from '../../../services/SleepSummaryServices';

const SleepSummaryPanel = ({ sleepSummary }) => {
  const [stats, setStats] = useState({
    sleepStats: undefined,
    keys: [],
  });

  useEffect(() => {
    const sleepStats = SleepSummaryServices.getSleepSummaryStats(sleepSummary);
    const keys = Object.keys(sleepStats);
    if (keys.length > 0) {
      setStats({
        sleepStats,
        keys,
      });
    }
  }, [sleepSummary]);

  return (
    <Grid container spacing={2}>
      {stats.keys.map((key) => (
        <Grid key={key} item xs={6} sm={4} md={3}>
          <Box border={1} borderColor="#CCC" borderRadius={25} height="100%">
            <StatCard
              stat={stats.sleepStats[key].stat}
              units={stats.sleepStats[key].units}
              description={stats.sleepStats[key].description}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default SleepSummaryPanel;
