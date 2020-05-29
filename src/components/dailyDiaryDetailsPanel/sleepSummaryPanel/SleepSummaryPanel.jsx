import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import StatCard from '../../statCar/StatCard';
import SleepSummaryServices from '../../../services/SleepSummaryServices';

const SleepSummaryPanel = ({ sleepSummary }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const sleepStats = SleepSummaryServices.getSleepSummaryStats(sleepSummary);
    setStats(sleepStats);
  }, [sleepSummary]);


  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        <Grid key={index} item xs={6} sm={4} md={3}>
          <Box boxShadow={2} borderRadius={10}>
            <StatCard
              stat={stat.stat}
              units={stat.units}
              description={stat.description}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default SleepSummaryPanel;
