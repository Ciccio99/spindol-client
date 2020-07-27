import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import moment from 'moment-timezone';
import SleepSummaryServices from 'services/SleepSummaryServices';

const green = { color: '#5DBD88' };
const red = { color: '#DE1E3D' };

const SleepCheckInStats = ({ sleepSummaries, sleepTrialTracker }) => {
  const [stats, setStats] = useState({
    baselineStats: undefined,
    trialStats: undefined,
    keys: [],
  });

  useEffect(() => {
    (async () => {
      const dates = sleepTrialTracker.checkIns
        .filter((checkIn) => checkIn.completed)
        .map((checkIn) => moment.utc(checkIn.date).add(1, 'day').startOf('day').toISOString());

      const ssArr = sleepSummaries
        .filter((ss) => dates.some((date) => moment.utc(date).isSame(moment.utc(ss.date), 'day')));

      const startDate = moment.utc(sleepTrialTracker.startDate).subtract(7, 'days');
      const endDate = moment.utc(sleepTrialTracker.startDate);
      const match = { date: { $gte: startDate.toISOString(), $lt: endDate.toISOString() } };
      const sort = { date: -1 };
      const incompleteSSArr = await SleepSummaryServices.query(match, sort);

      const trialStats = ssArr.length ? SleepSummaryServices.getSleepSummaryAvgStats(ssArr, incompleteSSArr) : undefined;
      const baselineStats = incompleteSSArr.length ? SleepSummaryServices.getSleepSummaryAvgStats(incompleteSSArr) : undefined;

      const keys = [];
      if (baselineStats && trialStats) {
        const baselineKeys = Object.keys(baselineStats);
        const todayKeys = Object.keys(trialStats);
        baselineKeys.forEach((key) => {
          if (todayKeys.includes(key)) {
            keys.push(key);
          }
        });
      } else {
        keys.concat(Object.keys(baselineStats));
      }

      setStats({
        baselineStats,
        trialStats,
        keys,
      });
    })();
  }, [sleepSummaries, sleepTrialTracker]);

  if (stats.baselineStats && stats.trialStats) {
    return (
      <Box>
        <Table style={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell variant="body" padding="checkbox" align="left">Sleep Trial</TableCell>
              <TableCell variant="body" padding="checkbox" align="center" />
              <TableCell variant="body" padding="checkbox" align="right">Baseline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.keys.map((key) => (
              <TableRow key={key}>
                <TableCell align="left">
                  <Typography color="primary" variant="subtitle1" display="inline">
                    <strong>
                      {`${stats.trialStats[key].stat}${stats.trialStats[key].units ? ` ${stats.trialStats[key].units}` : ''}`}
                    </strong>
                  </Typography>
                  {
                    stats.trialStats[key].diffPercent
                    && (
                    <Typography variant="subtitle2" display="inline" style={stats.trialStats[key].diffPercent >= 0 ? green : red}>
                      {` (${stats.trialStats[key].diffPercent}%)`}
                    </Typography>
                    )
                  }
                </TableCell>
                <TableCell variant="head" padding="none" align="center"><Typography variant="caption">{stats.trialStats[key].description}</Typography></TableCell>
                <TableCell align="right" variant="head">
                  <Typography color="primary" variant="subtitle1">
                    <strong>
                      {`${stats.baselineStats[key].stat}${stats.baselineStats[key].units ? ` ${stats.baselineStats[key].units}` : ''}`}
                    </strong>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }

  return (
    <Box>
      <Table style={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell variant="body" padding="checkbox" align="left" />
            <TableCell variant="body" padding="checkbox" align="right">Sleep Trial</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.keys.map((key) => (
            <TableRow key={key}>
              <TableCell variant="head" padding="none" align="left"><Typography variant="caption">{stats.trialStats[key].description}</Typography></TableCell>
              <TableCell align="right">
                <Typography color="primary" variant="subtitle1" display="inline">
                  <strong>
                    {`${stats.trialStats[key].stat}${stats.trialStats[key].units ? ` ${stats.trialStats[key].units}` : ''}`}
                  </strong>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SleepCheckInStats;
