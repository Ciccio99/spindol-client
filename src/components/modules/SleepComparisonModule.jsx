import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import moment from 'moment-timezone';
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
  const [subtitle, setSubtitle] = useState();

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
      setSubtitle(`Latest data from ${moment.utc(sleepSummaries[0].date).format('MMMM DD, YYYY')}`);
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

  if (todayStats.length && stats.length) {
    return (
      <PanelModule title={TITLE} subtitle={subtitle}>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="body" padding="checkbox" align="left">Last Night</TableCell>
                <TableCell variant="body" padding="checkbox" align="center" />
                <TableCell variant="body" padding="checkbox" align="right">Average Baseline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((statObj, index) => (
                <TableRow key={statObj.description}>
                  <TableCell align="left" variant="head"><Typography color="primary" variant="subtitle1"><strong>{`${todayStats[index].stat}${todayStats[index].units ? ` ${todayStats[index].units}` : ''}`}</strong></Typography></TableCell>
                  <TableCell padding="none" align="center"><Typography variant="caption">{statObj.description}</Typography></TableCell>
                  <TableCell align="right" variant="head"><Typography color="primary" variant="subtitle1"><strong>{`${statObj.stat}${statObj.units ? ` ${statObj.units}` : ''}`}</strong></Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PanelModule>
    );
  }

  return (
    <PanelModule title={TITLE} subtitle={subtitle}>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell padding="checkbox" align="right">Average Baseline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((statObj,) => (
              <TableRow key={statObj.description}>
                <TableCell align="left"><Typography variant="caption">{statObj.description}</Typography></TableCell>
                <TableCell align="right" variant="head"><Typography color="primary" variant="subtitle1"><strong>{`${statObj.stat}${statObj.units ? ` ${statObj.units}` : ''}`}</strong></Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PanelModule>
  );
};

export default React.memo(StatsDisplay);
