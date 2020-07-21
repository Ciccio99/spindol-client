import moment from 'moment-timezone';
import handleError from 'utils/handleError';
import axios from 'loaders/axios';

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

const getDashboardComparisonData = async () => {
  try {
    let queryString = JSON.stringify({
      match: { },
      sort: { date: 'desc' },
      limit: 7,
      skip: 0,
    });
    const baselineReq = axios.get('/sleepSummary', {
      params: { query: queryString },
    });

    queryString = JSON.stringify({
      match: {
        date: moment().format('YYYY-MM-DD'),
      },
      limit: 1,
    });

    const todayReq = axios.get('/sleepSummary', {
      params: { query: queryString },
    });

    const responses = await Promise.all([baselineReq, todayReq]);
    const baselineSleepSummaries = responses[0].data.length > 0 ? responses[0].data : [];
    const todaySleepSummaries = responses[1].data.length > 0 ? responses[1].data : [];
    const baselineStats = baselineSleepSummaries.length ? getSleepSummaryAvgStats(baselineSleepSummaries) : undefined;
    const todayStats = todaySleepSummaries.length ? getSleepSummaryStats(todaySleepSummaries[0]) : undefined;
    let keys = [];


    if (baselineStats && todayStats) {
      const baselineKeys = Object.keys(baselineStats);
      const todayKeys = Object.keys(todayStats);
      baselineKeys.forEach((key) => {
        if (todayKeys.includes(key)) {
          keys.push(key);
        }
      });
    } else {
      keys = keys.concat(Object.keys(baselineStats));
    }

    return {
      data: {
        baselineStats,
        todayStats,
        keys,
        lastSyncDate: moment.utc(baselineSleepSummaries[0].date).format('MMM DD, YYYY'),
      },
    };
  } catch (error) {
    return handleError;
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
  return diffMins;
};

const getAvgAvgHeartRate = (sleepSummaries) => {
  if (!sleepSummaries || sleepSummaries.length === 0) {
    throw new Error('Must include sleep summaries to calculate avg resting HR');
  }
  let avgHr = 0;
  let length = 0;
  sleepSummaries.forEach((ss) => {
    if (ss.hrAverage) {
      avgHr += ss.hrAverage;
      length += 1;
    }
  });

  if (length > 0) {
    avgHr /= length;
  }


  return avgHr;
};

const getSleepSummaryAvgStats = (sleepSummaries, oldSleepSummaries = undefined) => {
  const avgSleepDuration = getAvgSleepHoursDuration(sleepSummaries);
  const avgRemDuration = getAvgRemHoursDuration(sleepSummaries);
  const avgDeepDuration = getAvgDeepHoursDuration(sleepSummaries);
  const avgBedtimeMins = getAvgBedtime(sleepSummaries);
  const avgBedtime = moment('2020-4-20', 'YYYY-MM-DD').add(avgBedtimeMins, 'minutes');
  const avgHr = getAvgAvgHeartRate(sleepSummaries);

  const stats = {
    sleepDuration: {
      stat: avgSleepDuration.toFixed(1),
      units: 'hrs',
      description: 'Total Sleep',
    },
    remDuration: {
      stat: avgRemDuration.toFixed(1),
      units: 'hrs',
      description: 'REM',
    },
    deepDuration: {
      stat: avgDeepDuration.toFixed(1),
      units: 'hrs',
      description: 'Deep',
    },
    bedtime: {
      stat: avgBedtime.format('h:mm a'),
      units: null,
      description: 'Bedtime',
    },
    ...(avgHr ? {
      avgHr: {
        stat: avgHr.toFixed(0),
        units: 'bpm',
        description: 'Resting HR',
      },
    } : {}),
  };

  if (oldSleepSummaries) {
    const oldSleepDuration = getAvgSleepHoursDuration(oldSleepSummaries);
    const oldRemDuration = getAvgRemHoursDuration(oldSleepSummaries);
    const oldDeepDuration = getAvgDeepHoursDuration(oldSleepSummaries);
    // const oldAvgBedtimeMins = getAvgBedtime(oldSleepSummaries);

    stats.sleepDuration.diffPercent = (((avgSleepDuration - oldSleepDuration) * 100) / oldSleepDuration).toFixed(2);
    stats.remDuration.diffPercent = (((avgRemDuration - oldRemDuration) * 100) / oldRemDuration).toFixed(2);
    stats.deepDuration.diffPercent = (((avgDeepDuration - oldDeepDuration) * 100) / oldDeepDuration).toFixed(2);
    // Flipped the diff variables because it should be negative if your bedtime is later than before.
    // stats[3].diffPercent = ((oldAvgBedtimeMins - avgBedtimeMins) / oldAvgBedtimeMins).toFixed(2);
  }

  return stats;
};


const getSleepSummaryStats = (sleepSummary) => {
  if (!sleepSummary) {
    return undefined;
  }
  const sleepDuration = {
    stat: getSleepHoursDuration(sleepSummary).toFixed(1),
    units: 'hrs',
    description: 'Total Sleep',
  };
  const remDuration = sleepSummary.remSleepDuration ? {
    stat: (sleepSummary.remSleepDuration / 3600).toFixed(1),
    units: 'hrs',
    description: 'REM',
  } : undefined;
  const deepDuration = sleepSummary.deepSleepDuration ? {
    stat: (sleepSummary.deepSleepDuration / 3600).toFixed(1),
    units: 'hrs',
    description: 'Deep',
  } : undefined;
  const avgHr = sleepSummary.hrAverage ? {
    stat: sleepSummary.hrAverage.toFixed(0),
    units: 'bpm',
    description: 'Resting HR',
  } : undefined;
  const bedtime = {
    stat: moment.utc(sleepSummary.startDateTime).utcOffset(sleepSummary.timezoneOffset).format('h:mm a'),
    units: null,
    description: 'Bedtime',
  };
  const efficiency = sleepSummary.efficiency ? {
    stat: sleepSummary.efficiency,
    units: '%',
    description: 'Sleep Efficiency',
  } : undefined;

  const stats = {
    sleepDuration,
    ...(deepDuration ? { deepDuration } : {}),
    ...(remDuration ? { remDuration } : {}),
    bedtime,
    ...(efficiency ? { efficiency } : {}),
    ...(avgHr ? { avgHr } : {}),
  };


  return stats;
};

const getFatigueScore = async (date) => {
  try {
    const searchDate = moment(date);
    if (!searchDate) {
      throw new Error('Not a valid date');
    }
    const { data } = await axios.get('/sleepSummary/fatigueScore',
      {
        params: { date: moment(date).format('YYYY-MM-DD') },
      });
    return { data };
  } catch (error) {
    return handleError(error);
  }
};

export default {
  query,
  getDashboardComparisonData,
  getToday,
  getAvgSleepHoursDuration,
  getSleepSummaryAvgStats,
  getSleepSummaryStats,
  getSleepHoursDuration,
  getFatigueScore,
};
