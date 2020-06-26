import moment from 'moment-timezone';
import axios from '../loaders/axios';

const query = async (match = {}, sort = {}, limit = 0, skip = 0) => {
  const queryString = JSON.stringify({
    match, sort, limit, skip,
  });

  try {
    const { data } = await axios.get('/sleepSummary',
      {
        params: { query: queryString },
      });
    return data;
  } catch (error) {
    return [];
  }
};

const getToday = async () => {
  const today = moment().format('YYYY-MM-DD');
  const match = { date: today };
  const sleepSummaries = await query(match);
  if (sleepSummaries.length === 0) {
    return null;
  }

  return sleepSummaries[0];
};

const getSleepHoursDuration = (sleepSummary) => {
  const startDate = new Date(sleepSummary.startDateTime);
  const endDate = new Date(sleepSummary.endDateTime);
  const diffTime = Math.abs(endDate - startDate);
  let diffHours = diffTime / (1000 * 3600);
  if (sleepSummary.efficiency) {
    diffHours *= (sleepSummary.efficiency / 100);
  }
  return diffHours;
};

const getAvgSleepHoursDuration = (sleepSummaries) => {
  let totalHours = 0;
  sleepSummaries.forEach((ss) => {
    const diffHours = getSleepHoursDuration(ss);
    totalHours += diffHours;
  });
  const avgSleepTime = totalHours / sleepSummaries.length;
  return avgSleepTime;
};

const getAvgRemHoursDuration = (sleepSummaries) => {
  let totalHours = 0;
  sleepSummaries.forEach((ss) => {
    totalHours += (ss.remSleepDuration / 3600);
  });
  const avgRemHours = totalHours / sleepSummaries.length;
  return avgRemHours;
};

const getAvgDeepHoursDuration = (sleepSummaries) => {
  let totalHours = 0;
  sleepSummaries.forEach((ss) => {
    totalHours += (ss.deepSleepDuration / 3600);
  });
  const avgDeepHours = totalHours / sleepSummaries.length;
  return avgDeepHours;
};

const getAvgBedtime = (sleepSummaries) => {
  let diffMins = 0;
  sleepSummaries.forEach((ss) => {
    const startDate = moment.utc(ss.startDateTime);
    const initDay = moment.utc(ss.date, 'YYYY-MM-DD').subtract(1, 'day');

    diffMins += startDate.diff(initDay, 'minutes') + ss.timezoneOffset;
  });

  diffMins = Math.floor(diffMins / sleepSummaries.length);
  // const bedTime = moment('2020-4-20', 'YYYY-MM-DD').add(diffMins, 'minutes');
  return diffMins;
};

const getSleepSummaryAvgStats = (sleepSummaries, oldSleepSummaries = undefined) => {
  const avgSleepDuration = getAvgSleepHoursDuration(sleepSummaries);
  const avgRemDuration = getAvgRemHoursDuration(sleepSummaries);
  const avgDeepDuration = getAvgDeepHoursDuration(sleepSummaries);
  const avgBedtimeMins = getAvgBedtime(sleepSummaries);
  const avgBedtime = moment('2020-4-20', 'YYYY-MM-DD').add(avgBedtimeMins, 'minutes');

  const stats = [
    {
      stat: avgSleepDuration.toFixed(1),
      units: 'hrs',
      description: 'Total Sleep',
    },
    {
      stat: avgRemDuration.toFixed(1),
      units: 'hrs',
      description: 'REM',
    },
    {
      stat: avgDeepDuration.toFixed(1),
      units: 'hrs',
      description: 'Deep',
    },
    {
      stat: avgBedtime.format('h:mm a'),
      units: null,
      description: 'Bedtime',
    },
  ];

  if (oldSleepSummaries) {
    const oldSleepDuration = getAvgSleepHoursDuration(oldSleepSummaries);
    const oldRemDuration = getAvgRemHoursDuration(oldSleepSummaries);
    const oldDeepDuration = getAvgDeepHoursDuration(oldSleepSummaries);
    // const oldAvgBedtimeMins = getAvgBedtime(oldSleepSummaries);

    stats[0].diffPercent = ((avgSleepDuration - oldSleepDuration) / oldSleepDuration).toFixed(2);
    stats[1].diffPercent = ((avgRemDuration - oldRemDuration) / oldRemDuration).toFixed(2);
    stats[2].diffPercent = ((avgDeepDuration - oldDeepDuration) / oldDeepDuration).toFixed(2);
    // Flipped the diff variables because it should be negative if your bedtime is later than before.
    // stats[3].diffPercent = ((oldAvgBedtimeMins - avgBedtimeMins) / oldAvgBedtimeMins).toFixed(2);
  }

  return stats;
};


const getSleepSummaryStats = (sleepSummary) => {
  const sleepDuration = getSleepHoursDuration(sleepSummary).toFixed(1);
  const remDuration = (sleepSummary.remSleepDuration / 3600).toFixed(1);
  const deepDuration = (sleepSummary.deepSleepDuration / 3600).toFixed(1);
  const bedtime = moment.utc(sleepSummary.startDateTime).utcOffset(sleepSummary.timezoneOffset);
  const { efficiency } = sleepSummary;

  const stats = [
    {
      stat: sleepDuration,
      units: 'hrs',
      description: 'Total Sleep',
    },
    {
      stat: remDuration,
      units: 'hrs',
      description: 'REM',
    },
    {
      stat: deepDuration,
      units: 'hrs',
      description: 'Deep',
    },
    {
      stat: bedtime.format('h:mm a'),
      units: null,
      description: 'Bedtime',
    }, {
      stat: efficiency,
      units: '%',
      description: 'Sleep Efficiency',
    },
  ];

  return stats;
};

const getFatigueScore = async (date) => {
  try {
    const { data } = await axios.get('/sleepSummary/fatigueScore',
      {
        params: { date: moment(date).format('YYYY-MM-DD') },
      });
    return { data };
  } catch (error) {
    return {};
  }
};

export default {
  query,
  getToday,
  getAvgSleepHoursDuration,
  getSleepSummaryAvgStats,
  getSleepSummaryStats,
  getSleepHoursDuration,
  getFatigueScore,
};
