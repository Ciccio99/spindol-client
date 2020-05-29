import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Paper,
  Grid,
  LinearProgress,
  Typography,
  Divider,
} from '@material-ui/core';
import StatCard from '../statCar/StatCard';
import UserContext from '../../context/userContext';
import SleepSummaryServices from '../../services/SleepSummaryServices';
import AlertSystemContext from '../../context/alertSystemContext';

const StatsDisplay = () => {
  const { user } = useContext(UserContext);
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [stats, setStats] = useState([]);
  const [todayStats, setTodayStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    (async () => {
      setLoading(true);
      const match = { };
      const sort = { date: 'desc' };
      const limit = 7;
      const sleepSummaries = await SleepSummaryServices.query(match, sort, limit);
      if (sleepSummaries.length === 0) {
        if (didCancel) {
          setLoading(false);
          return;
        }
        setStats([]);
        dispatchAlertSystem({
          type: 'WARNING',
          message: 'Sleep data not available.',
        });
        setLoading(false);
        return;
      }
      if (sleepSummaries.length === 1) {
        if (didCancel) {
          setLoading(false);
          setStats([]);
        }
        return;
      }
      const data = SleepSummaryServices.getSleepSummaryAvgStats(sleepSummaries);
      if (didCancel) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setStats(data);
    })();

    (async () => {
      setLoading(true);
      const sleepSummary = await SleepSummaryServices.getToday();
      if (sleepSummary) {
        const statsArr = SleepSummaryServices.getSleepSummaryStats(sleepSummary);
        setTodayStats(statsArr);
      }

      setLoading(false);
    })();

    return () => { didCancel = true; };
  }, [dispatchAlertSystem, user]);

  if (loading) {
    return <Box mb={3}><LinearProgress color="secondary" /></Box>;
  }

  if (!todayStats.length && !stats.length) {
    return (
      <Box mb={3}>
        <Paper elevation={0}>
          <Box pb={2}>
            <Box p={2}>
              <Typography variant="h5">Sleep</Typography>
            </Box>
            <Divider />
            <Box mt={1} p={2}>
              <Typography variant="h6">No sleep data available...</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box mb={3}>
      <Paper elevation={0}>
        <Box pb={2}>
          <Box p={2}>
            <Typography variant="h5">Sleep</Typography>
          </Box>
          <Divider />
          {
            stats.length !== 0
            && (
            <Box mt={1} p={2}>
              <Box mb={2}>
                <Typography variant="h6" color="textSecondary">Weekly Average</Typography>
              </Box>
              <Grid container spacing={2}>
                {stats.map((statObj, index) => (
                  <Grid key={index} item xs={6} sm={4} md={3}>
                    <Box border={1} borderColor="#CCC" borderRadius={10} height="100%">
                      <StatCard
                        stat={statObj.stat}
                        units={statObj.units}
                        description={statObj.description}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            )
          }
          {
            todayStats.length !== 0
            && (
            <Box p={2}>
              <Box mb={2}>
                <Typography variant="h6" color="textSecondary">Last Night</Typography>
              </Box>
              <Grid container spacing={2}>
                {todayStats.map((statObj, index) => (
                  <Grid key={index} item xs={6} sm={4} md={3}>
                    <Box border={1} borderColor="#CCC" borderRadius={10} height="100%">
                      <StatCard
                        stat={statObj.stat}
                        units={statObj.units}
                        description={statObj.description}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            )
            }
        </Box>
      </Paper>
    </Box>
  );
};

export default StatsDisplay;