import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import moment from 'moment-timezone';
import SleepSummaryServices from 'services/SleepSummaryServices';
import StatCard from 'components/statCar/StatCard';

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


      const startDate = moment.utc(sleepTrialTracker.startDate);
      const endDate = moment.utc(sleepTrialTracker.endDate);
      const dayDiff = endDate.diff(startDate, 'days');
      const match = { date: { $nin: dates, $lte: endDate.toISOString() } };
      const sort = { date: -1 };
      const limit = dayDiff;
      const incompleteSSArr = await SleepSummaryServices.query(match, sort, limit);

      const stats = SleepSummaryServices.getSleepSummaryAvgStats(ssArr, incompleteSSArr);
      setSleepStats(stats);

      const incompleteStats = SleepSummaryServices.getSleepSummaryAvgStats(incompleteSSArr);
      setIncompleteSleepStats(incompleteStats);
    })();
  }, [sleepSummaries, sleepTrialTracker]);

  useEffect(() => {

  }, [sleepSummaries, sleepTrialTracker]);

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item container xs={12} spacing={2} justify="space-between">
        <Grid item xs={6} sm={5}>
          <Box pb={1}>
            <Typography variant="h6">Trial</Typography>
            <Divider />
          </Box>
        </Grid>
        <Grid item xs={6} sm={5}>
          <Box pb={1}>
            <Typography variant="h6">Baseline</Typography>
            <Divider />
          </Box>
        </Grid>
      </Grid>
      { sleepStats.length === incompleteSleepStats.length
        && sleepStats.map((statObj, index) => (
          <Grid key={index} item container xs={12} justify="space-between" spacing={1}>
            <Grid item xs={6} sm={5}>
              <Box border={1} borderColor="#CCC" borderRadius={25} minHeight="100%">
                <StatCard
                  stat={statObj.stat}
                  units={statObj.units}
                  description={statObj.description}
                  tickerPercent={statObj.diffPercent}
                />
              </Box>
            </Grid>
            <Grid item xs={6} sm={5}>
              <Box border={1} borderColor="#CCC" borderRadius={25} minHeight="100%">
                <StatCard
                  stat={incompleteSleepStats[index].stat}
                  units={incompleteSleepStats[index].units}
                  description={incompleteSleepStats[index].description}
                  tickerPercent={incompleteSleepStats[index].diffPercent}
                />
              </Box>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default SleepCheckInStats;
