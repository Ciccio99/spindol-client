import axios from 'axios';
import moment from 'moment-timezone';

const query = async (match={}, sort={}, limit=0, skip=0) => {
  const queryString = JSON.stringify({ match, sort, limit, skip });

  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/sleepSummary`,
      { params: { query: queryString }  },
      { useCredentials: true }
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
  let totalHours = 0;
  let totalMins = 0;
  sleepSummaries.forEach(ss => {
    const startDate = moment(ss.startDateTime).tz(ss.timezone);
    totalHours += startDate.hours();
    totalMins += startDate.minutes();
  });
  const avgHours = Math.round(totalHours / sleepSummaries.length);
  const avgMins = Math.round(totalMins / sleepSummaries.length);
  const bedTime = moment('2020-4-20', 'YYYY-MM-DD').add(avgHours, 'hours').add(avgMins, 'minutes');
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
      units: 'Hrs',
      description: 'Weekly average sleep duration'
    },
    {
      stat: avgRemDuration,
      units: 'Hrs',
      description: 'Weekly average REM duration'
    },
    {
      stat: avgDeepDuration,
      units: 'Hrs',
      description: 'Weekly average Deep duration'
    },{
      stat: `${avgBedtime.hours() % 12}:${avgBedtime.minutes()}`,
      units: `${avgBedtime.hours() > 12 ? 'pm' : 'am'}`,
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
