import React, { useState, useEffect } from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PanelModule from 'components/organizers/PanelModule';
import SleepSummaryServices from 'services/SleepSummaryServices';
import { useAlertSystemDispatch } from 'context/alertSystemContext';

const TITLE = 'Sleep';

const StatsDisplay = () => {
  const dispatchAlertSystem = useAlertSystemDispatch();
  const [stats, setStats] = useState({
    baselineStats: undefined,
    todayStats: undefined,
    keys: [],
    lastSyncDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [subtitle, setSubtitle] = useState();

  useEffect(() => {
    let didCancel = false;
    (async () => {
      setLoading(true);

      const { data, error } = await SleepSummaryServices.getDashboardComparisonData();
      if (error) {
        dispatchAlertSystem({
          type: 'WARNING',
          message: 'Something went wrong. Sleep data unavailable...',
        });
        return;
      }
      if (data) {
        if (!didCancel) {
          setStats(data);
          setSubtitle(`Latest data from ${data.lastSyncDate}`);
        }
      }

      setLoading(false);
    })();

    return () => { didCancel = true; };
  }, [dispatchAlertSystem]);

  if (loading) {
    return (
      <PanelModule title={TITLE}>
        <Box>
          <LinearProgress color="secondary" />
        </Box>
      </PanelModule>
    );
  }

  if (!stats.baselineStats && !stats.todayStats) {
    return (
      <PanelModule title={TITLE}>
        <Typography variant="h6">No sleep data available...</Typography>
      </PanelModule>
    );
  }

  if (stats.todayStats && stats.baselineStats) {
    return (
      <PanelModule title={TITLE} subtitle={subtitle}>
        <Box>
          <Table style={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell variant="body" padding="checkbox" align="left">Last Night</TableCell>
                <TableCell variant="body" padding="checkbox" align="center" />
                <TableCell variant="body" padding="checkbox" align="right">Average Baseline</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.keys.map((key) => (
                <TableRow key={key}>
                  <TableCell align="left" variant="head">
                    <Typography color="primary" variant="subtitle1">
                      <strong>
                        {`${stats.todayStats[key].stat}${stats.todayStats[key].units ? ` ${stats.todayStats[key].units}` : ''}`}
                      </strong>
                    </Typography>
                  </TableCell>
                  <TableCell padding="none" align="center"><Typography variant="caption">{stats.baselineStats[key].description}</Typography></TableCell>
                  <TableCell align="right" variant="head">
                    <Typography color="primary" variant="subtitle1">
                      <strong>{`${stats.baselineStats[key].stat}${stats.baselineStats[key].units ? ` ${stats.baselineStats[key].units}` : ''}`}</strong>
                    </Typography>
                  </TableCell>
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
            {stats.keys.map((key) => (
              <TableRow key={stats.baselineStats[key].description}>
                <TableCell align="left"><Typography variant="caption">{stats.baselineStats[key].description}</Typography></TableCell>
                <TableCell align="right" variant="head">
                  <Typography color="primary" variant="subtitle1">
                    <strong>{`${stats.baselineStats[key].stat}${stats.baselineStats[key].units ? ` ${stats.baselineStats[key].units}` : ''}`}</strong>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PanelModule>
  );
};

export default React.memo(StatsDisplay);
