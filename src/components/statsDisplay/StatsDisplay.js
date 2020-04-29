import React, { useState, useEffect, useContext } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import StatCard from '../statCar/StatCard';
import UserContext from '../../context/userContext';
import SleepSummaryServices from '../../services/SleepSummaryServices';

const StatsDisplay = () => {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const match = { owner: user._id };
      const sort = { date: 'desc'};
      const limit = 7;
      const sleepSummaries = await SleepSummaryServices.query(match, sort, limit);
      console.log(sleepSummaries);
      if (sleepSummaries.length === 0) {
        setStats([]);
        return;
      }
      const stats = SleepSummaryServices.getSleepSummaryStats(sleepSummaries);
      setStats(stats);
    }
    fetchData();
    // setStats(testStats);
  }, [user]);

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        {stats.map((statObj, index) => {
          return (
            <Grid key={index} item xs={6} sm={4} md={3}>
              <StatCard
                stat={statObj.stat}
                units={statObj.units}
                description={statObj.description}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default StatsDisplay;
