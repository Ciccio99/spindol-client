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
  const [sleepStats, setSleepStats] = useState([]);
  const [incompleteSleepStats, setIncompleteSleepStats] = useState([]);

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

      const stats = SleepSummaryServices.getSleepSummaryAvgStats(ssArr, incompleteSSArr);
      setSleepStats(stats);

      const incompleteStats = SleepSummaryServices.getSleepSummaryAvgStats(incompleteSSArr);
      setIncompleteSleepStats(incompleteStats);
    })();
  }, [sleepSummaries, sleepTrialTracker]);

  if (sleepStats.length === incompleteSleepStats.length) {
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
            {sleepStats.map((statObj, index) => (
              <TableRow key={statObj.description}>
                <TableCell align="left">
                  <Typography color="primary" variant="subtitle1" display="inline">
                    <strong>
                      {`${statObj.stat}${statObj.units ? ` ${statObj.units}` : ''}`}
                    </strong>
                  </Typography>
                  {
                    statObj.diffPercent
                    && (
                    <Typography variant="subtitle2" display="inline" style={statObj.diffPercent > 0 ? green : red}>
                      {` (${statObj.diffPercent}%)`}
                    </Typography>
                    )
                  }
                </TableCell>
                <TableCell variant="head" padding="none" align="center"><Typography variant="caption">{statObj.description}</Typography></TableCell>
                <TableCell align="right" variant="head">
                  <Typography color="primary" variant="subtitle1">
                    <strong>
                      {`${incompleteSleepStats[index].stat}${incompleteSleepStats[index].units ? ` ${incompleteSleepStats[index].units}` : ''}`}
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
          {sleepStats.map((statObj) => (
            <TableRow key={statObj.description}>
              <TableCell variant="head" padding="none" align="left"><Typography variant="caption">{statObj.description}</Typography></TableCell>
              <TableCell align="right">
                <Typography color="primary" variant="subtitle1" display="inline">
                  <strong>
                    {`${statObj.stat}${statObj.units ? ` ${statObj.units}` : ''}`}
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
