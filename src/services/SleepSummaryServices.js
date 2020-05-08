import axios from '../loaders/axios';
import moment from 'moment-timezone';

const query = async (match={}, sort={}, limit=0, skip=0) => {
  const queryString = JSON.stringify({ match, sort, limit, skip });

  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/sleepSummary`,
      {
        params: { query: queryString },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAvgSleepHoursDuration = (sleepSummaries) => {
  let totalHours = 0;
  sleepSummaries.forEach(ss => {
    const startDate = new Date(ss.startDateTime);
    const endDate = new Date(ss.endDateTime);
    const diffTime = Math.abs(endDate - startDate);
    const diffHours = diffTime / (1000 * 3600);
    totalHours += diffHours;
  });
  const avgSleepTime = totalHours / sleepSummaries.length;
  return avgSleepTime;
};

const getAvgRemHoursDuration = (sleepSummaries) => {
  let totalHours = 0;
  sleepSummaries.forEach(ss => {
    totalHours += (ss.remSleepDuration / 3600);
  });
  const avgRemHours = totalHours / sleepSummaries.length;
  return avgRemHours;
};

const getAvgDeepHoursDuration = (sleepSummaries) => {
  let totalHours = 0;
  sleepSummaries.forEach(ss => {
    totalHours += (ss.deepSleepDuration / 3600);
  });
  const avgDeepHours = totalHours / sleepSummaries.length;
  return avgDeepHours;
};

const getAvgBedtime = (sleepSummaries) => {
  let diffMins = 0;
  sleepSummaries.forEach(ss => {
    let startDate = moment(ss.startDateTime).utc().utcOffset(ss.timezoneOffset);
    const initDay = moment(ss.date, 'YYYY-MM-DD').utc().utcOffset(ss.timezoneOffset)
    diffMins += startDate.diff(initDay, 'minutes');
  });

  diffMins = Math.floor(diffMins / sleepSummaries.length);
  const bedTime = moment('2020-4-20', 'YYYY-MM-DD').add(diffMins, 'minutes');
  return bedTime;
};

const getSleepSummaryStats = (sleepSummaries) => {
  let avgSleepDuration = getAvgSleepHoursDuration(sleepSummaries).toFixed(1);
  let avgRemDuration = getAvgRemHoursDuration(sleepSummaries).toFixed(1);
  let avgDeepDuration = getAvgDeepHoursDuration(sleepSummaries).toFixed(1);
  let avgBedtime = getAvgBedtime(sleepSummaries);

  const stats = [
    {
      stat: avgSleepDuration,
      units: 'hrs',
      description: 'Weekly average sleep duration'
    },
    {
      stat: avgRemDuration,
      units: 'hrs',
      description: 'Weekly average REM duration'
    },
    {
      stat: avgDeepDuration,
      units: 'hrs',
      description: 'Weekly average Deep duration'
    },{
      stat: avgBedtime.format('h:mm a'),
      units: null,
      description: 'Weekly average bedtime'
    }
  ];

  return stats;
};

export default {
  query,
  getAvgSleepHoursDuration,
  getSleepSummaryStats,
};
