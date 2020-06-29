import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import PanelModule from 'components/organizers/PanelModule';
import StatCard from '../statCar/StatCard';
import UserContext from '../../context/userContext';
import SleepSummaryServices from '../../services/SleepSummaryServices';
import AlertSystemContext from '../../context/alertSystemContext';

const TITLE = 'Sleep';

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
    return (
      <PanelModule title={TITLE}>
        <Box>
          <LinearProgress color="secondary" />
        </Box>
      </PanelModule>
    );
  }

  if (!todayStats.length && !stats.length) {
    return (
      <PanelModule title={TITLE}>
        <Typography variant="h6">No sleep data available...</Typography>
      </PanelModule>
    );
  }

  return (
    <PanelModule title={TITLE}>
      {
        stats.length !== 0
        && (
        <>
          <Box mb={2}>
            <Typography variant="h6" color="textSecondary">Weekly Baseline</Typography>
          </Box>
          <Grid container spacing={2}>
            {stats.map((statObj, index) => (
              <Grid key={index} item xs={6} sm={4} md={3}>
                <Box border={1} borderColor="#CCC" borderRadius={25} height="100%">
                  <StatCard
                    stat={statObj.stat}
                    units={statObj.units}
                    description={statObj.description}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
        )
      }
      {
        todayStats.length !== 0
        && (
          <>
            <Box mt={4} mb={2}>
              <Typography variant="h6" color="textSecondary">Last Night</Typography>
            </Box>
            <Grid container spacing={2}>
              {todayStats.map((statObj, index) => (
                <Grid key={index} item xs={6} sm={4} md={3}>
                  <Box border={1} borderColor="#CCC" borderRadius={25} height="100%">
                    <StatCard
                      stat={statObj.stat}
                      units={statObj.units}
                      description={statObj.description}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )
      }
    </PanelModule>
  );
};

export default React.memo(StatsDisplay);
