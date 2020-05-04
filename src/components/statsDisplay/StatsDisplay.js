import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import StatCard from '../statCar/StatCard';
import UserContext from '../../context/userContext';
import SleepSummaryServices from '../../services/SleepSummaryServices';
import DeviceServices from '../../services/DeviceServices';

const StatsDisplay = () => {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      console.log('syncing')
      await DeviceServices.syncDeviceData('oura');
      setLoading(false);
    };
    fetchData();
  }, []);


  useEffect(() => {
    async function fetchData () {
      const match = { owner: user._id };
      const sort = { date: 'desc'};
      const limit = 7;
      const sleepSummaries = await SleepSummaryServices.query(match, sort, limit);
      if (sleepSummaries.length === 0) {
        setStats([]);
        return;
      }
      const stats = SleepSummaryServices.getSleepSummaryStats(sleepSummaries);
      setStats(stats);
    }
    fetchData();

  }, [user]);

  return (
    <Box mb={2}>
    {
      loading
      ? <CircularProgress color="secondary"/>
      : <Grid container spacing={2}>
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
    }

    </Box>
  );
};

export default StatsDisplay;
