import moment from 'moment-timezone';
import handleError from 'utils/handleError';
import ErrorHandler from 'utils/ErrorHandler';
import axios from 'loaders/axios';

const query = async (match = {}, sort = {}, limit = 0, skip = 0) => {
  const queryString = JSON.stringify({
    match,
    sort,
    limit,
    skip,
  });

  try {
    const { data } = await axios.get('/sleepSummary', {
      params: { query: queryString },
    });
    return data;
  } catch (error) {
    return [];
  }
};

export const getByDate = async (date) => {
  try {
    if (!date) {
      throw new Error('Must provide date.');
    }

    const queryDate = moment(date).format('YYYY-MM-DD');
    const queryString = JSON.stringify({
      match: {
        date: queryDate,
      },
      limit: 0,
      skip: 0,
    });
    const { data } = await axios.get('/sleepSummary', {
      params: { query: queryString },
    });
    if (data.length > 0) {
      return data[0];
    }

    return {};
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const getSleepByDateRange = async (startDate, endDate) => {
  const queryString = JSON.stringify({
    match: {
      date: { $gte: startDate, $lte: endDate },
    },
    sort: { date: 1 },
    limit: 0,
    skip: 0,
  });

  try {
    const { data } = await axios.get('/sleepSummary', {
      params: { query: queryString },
    });
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const getAllSleep = async () => {
  const queryString = JSON.stringify({
    match: {},
    sort: { date: 1 },
    limit: 0,
    skip: 0,
  });

  try {
    const { data } = await axios.get('/sleepSummary', {
      params: { query: queryString },
    });
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const getDashboardComparisonData = async ({ searchDate }) => {
  const todayDate = searchDate ? moment(searchDate) : moment();

  try {
    let queryString = JSON.stringify({
      match: {
        date: { $lt: todayDate.format('YYYY-MM-DD') },
      },
      sort: { date: 'desc' },
      limit: 14,
      skip: 0,
    });
    const baselineReq = axios.get('/sleepSummary', {
      params: { query: queryString },
    });

    queryString = JSON.stringify({
      match: {
        date: todayDate.format('YYYY-MM-DD'),
      },
      limit: 1,
    });

    const todayReq = axios.get('/sleepSummary', {
      params: { query: queryString },
    });

    const responses = await Promise.all([baselineReq, todayReq]);

    const baselineSleepSummaries =
      responses[0].data.length > 0 ? responses[0].data : [];
    const todaySleepSummaries =
      responses[1].data.length > 0 ? responses[1].data : [];
    const baselineStats = baselineSleepSummaries.length
      ? getSleepSummaryAvgStats(baselineSleepSummaries)
      : undefined;
    const todayStats = todaySleepSummaries.length
      ? getSleepSummaryAvgStats(
          todaySleepSummaries,
          baselineSleepSummaries.length ? baselineSleepSummaries : undefined
        )
      : undefined;
    let keys = [];

    if (baselineStats && todayStats) {
      const baselineKeys = Object.keys(baselineStats);
      const todayKeys = Object.keys(todayStats);
      baselineKeys.forEach((key) => {
        if (todayKeys.includes(key)) {
          keys.push(key);
        }
      });
    } else if (baselineStats) {
      keys = keys.concat(Object.keys(baselineStats));
    }
    const series = todaySleepSummaries.concat(baselineSleepSummaries);
    // Calculate stats
    const sleepStats = series.reduce(
      (stats, sleepSummary, index) => {
        const sleepDuration = getSleepHoursDuration(sleepSummary);
        if (!sleepDuration) {
          return stats;
        }
        if (index === 0) {
          stats.min = sleepDuration;
          stats.max = sleepDuration;
          return stats;
        }
        if (sleepDuration < stats.min) {
          stats.min = sleepDuration;
        }
        if (sleepDuration > stats.max) {
          stats.max = sleepDuration;
        }
        return stats;
      },
      { min: 0, max: 0 }
    );
    const data = {
      baselineStats,
      todayStats,
      series,
      sleepStats,
      keys,
      lastSyncDate: moment
        .utc(todaySleepSummaries[0]?.date || baselineSleepSummaries[0]?.date)
        .format('MMM DD, YYYY'),
    };

    return data;
  } catch (error) {
    throw new ErrorHandler(error);
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

export const getSleepHoursDuration = (sleepSummary) => {
  const startDate = new Date(sleepSummary.startDateTime);
  const endDate = new Date(sleepSummary.endDateTime);
  const diffTime = Math.abs(endDate - startDate);
  let diffHours = diffTime / (1000 * 3600);
  if (sleepSummary.efficiency) {
    diffHours *= sleepSummary.efficiency / 100;
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
    totalHours += ss.remSleepDuration / 3600;
  });
  const avgRemHours = totalHours / sleepSummaries.length;
  return avgRemHours;
};

const getAvgDeepHoursDuration = (sleepSummaries) => {
  let totalHours = 0;
  sleepSummaries.forEach((ss) => {
    totalHours += ss.deepSleepDuration / 3600;
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

const toComparisonFormat = (newSleepData, baselineSleepData) => {
  const newStats = newSleepData.length
    ? getSleepSummaryAvgStats(newSleepData, baselineSleepData)
    : undefined;
  const baselineStats = getSleepSummaryAvgStats(baselineSleepData);

  let keys = [];

  if (newStats && baselineStats) {
    const baselineKeys = Object.keys(baselineStats);
    const newKeys = Object.keys(newStats);
    baselineKeys.forEach((key) => {
      if (newKeys.includes(key)) {
        keys.push(key);
      }
    });
  } else if (baselineStats) {
    keys = keys.concat(Object.keys(baselineStats));
  }

  const data = {
    newStats,
    baselineStats,
    keys,
  };

  return data;
};

const getSleepSummaryAvgStats = (
  sleepSummaries,
  oldSleepSummaries = undefined
) => {
  const avgSleepDuration = getAvgSleepHoursDuration(sleepSummaries);
  const avgRemDuration = getAvgRemHoursDuration(sleepSummaries);
  const avgDeepDuration = getAvgDeepHoursDuration(sleepSummaries);
  const avgBedtimeMins = getAvgBedtime(sleepSummaries);
  const avgBedtime = moment('2020-4-20', 'YYYY-MM-DD').add(
    avgBedtimeMins,
    'minutes'
  );
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
    ...(avgHr
      ? {
          avgHr: {
            stat: avgHr.toFixed(0),
            units: 'bpm',
            description: 'Avg Resting HR',
          },
        }
      : {}),
  };

  if (oldSleepSummaries) {
    const oldSleepDuration = getAvgSleepHoursDuration(oldSleepSummaries);
    const oldRemDuration = getAvgRemHoursDuration(oldSleepSummaries);
    const oldDeepDuration = getAvgDeepHoursDuration(oldSleepSummaries);
    const oldAvgHr = getAvgAvgHeartRate(oldSleepSummaries);
    // const oldAvgBedtimeMins = getAvgBedtime(oldSleepSummaries);

    // stats.sleepDuration.diffPercent = Math.round(((avgSleepDuration - oldSleepDuration) * 100) / oldSleepDuration).toFixed(0);

    stats.sleepDuration.diffPercent = (
      avgSleepDuration - oldSleepDuration
    ).toFixed(1);
    stats.remDuration.diffPercent = (avgRemDuration - oldRemDuration).toFixed(
      1
    );
    stats.deepDuration.diffPercent = (
      avgDeepDuration - oldDeepDuration
    ).toFixed(1);
    if (avgHr) {
      stats.avgHr.diffPercent = Math.round(
        ((oldAvgHr - avgHr) * 100) / oldAvgHr
      ).toFixed(0);
    }
  }

  return stats;
};

const getTotalStats = (sleepSummaries) => {
  const totals = sleepSummaries.reduce(
    (totalsMap, sleepSummary) => {
      totalsMap.sleepTime += getSleepHoursDuration(sleepSummary);
      totalsMap.deep += sleepSummary.deepSleepDuration;
      totalsMap.rem += sleepSummary.remSleepDuration;
      return totalsMap;
    },
    {
      sleepTime: 0,
      deep: 0,
      rem: 0,
    }
  );

  return totals;
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
  const remDuration = sleepSummary.remSleepDuration
    ? {
        stat: (sleepSummary.remSleepDuration / 3600).toFixed(1),
        units: 'hrs',
        description: 'REM',
      }
    : undefined;
  const deepDuration = sleepSummary.deepSleepDuration
    ? {
        stat: (sleepSummary.deepSleepDuration / 3600).toFixed(1),
        units: 'hrs',
        description: 'Deep',
      }
    : undefined;
  const avgHr = sleepSummary.hrAverage
    ? {
        stat: sleepSummary.hrAverage.toFixed(0),
        units: 'bpm',
        description: 'Resting HR',
      }
    : undefined;
  const bedtime = {
    stat: moment
      .utc(sleepSummary.startDateTime)
      .utcOffset(sleepSummary.timezoneOffset)
      .format('h:mm a'),
    units: null,
    description: 'Bedtime',
  };
  const efficiency = sleepSummary.efficiency
    ? {
        stat: sleepSummary.efficiency,
        units: '%',
        description: 'Sleep Efficiency',
      }
    : undefined;

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
    const { data } = await axios.get('/sleepSummary/fatigueScore', {
      params: { date: moment(date).format('YYYY-MM-DD') },
    });
    return { data };
  } catch (error) {
    return handleError(error);
  }
};

const getTagSleepTableData = async (startDate, endDate, tag) => {
  try {
    const { data } = await axios.get('/sleepSummary/tags', {
      params: {
        startDate,
        endDate,
        tags: tag._id,
      },
    });
    if (!data.tagSleepData?.length) {
      throw new Error(`No sleep data available for your "${tag.tag}" tag!`);
    }
    if (!data.baselineSleepData?.length) {
      throw new Error(
        `No baseline sleep data available for your "${tag.tag}" tag - you've performed "${tag.tag}" every day throughout this date range.`
      );
    }

    const comparisonData = toComparisonFormat(
      data.tagSleepData,
      data.baselineSleepData
    );
    comparisonData.newStatsCount = data.tagSleepData?.length;
    comparisonData.baselineStatsCounts = data.baselineSleepData?.length;
    return comparisonData;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export default {
  query,
  getDashboardComparisonData,
  getToday,
  getAvgSleepHoursDuration,
  getSleepSummaryAvgStats,
  getTotalStats,
  getSleepSummaryStats,
  getSleepHoursDuration,
  getFatigueScore,
  getTagSleepTableData,
  getSleepByDateRange,
};
