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

const getSleepHoursDuration = (sleepSummary) => {
  const startDate = new Date(sleepSummary.startDateTime);
  const endDate = new Date(sleepSummary.endDateTime);
  const diffTime = Math.abs(endDate - startDate);
  const diffHours = diffTime / (1000 * 3600);
  return diffHours;
}

const getAvgSleepHoursDuration = (sleepSummaries) => {
  let totalHours = 0;
  sleepSummaries.forEach(ss => {
    const diffHours = getSleepHoursDuration(ss);
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
    let startDate = moment.utc(ss.startDateTime);
    const initDay = moment.utc(ss.date, 'YYYY-MM-DD').subtract(1, 'day');

    diffMins += startDate.diff(initDay, 'minutes') + ss.timezoneOffset;
  });

  diffMins = Math.floor(diffMins / sleepSummaries.length);
  const bedTime = moment('2020-4-20', 'YYYY-MM-DD').add(diffMins, 'minutes');
  return bedTime;
};

const getSleepSummaryAvgStats = (sleepSummaries) => {
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


const getSleepSummaryStats = (sleepSummary) => {
  let sleepDuration = getSleepHoursDuration(sleepSummary).toFixed(1);
  let remDuration = (sleepSummary.remSleepDuration / 3600).toFixed(1);
  let deepDuration = (sleepSummary.deepSleepDuration / 3600).toFixed(1);
  let bedtime = moment.utc(sleepSummary.startDateTime).utcOffset(sleepSummary.timezoneOffset);

  const stats = [
    {
      stat: sleepDuration,
      units: 'hrs',
      description: 'Total Sleep'
    },
    {
      stat: remDuration,
      units: 'hrs',
      description: 'REM'
    },
    {
      stat: deepDuration,
      units: 'hrs',
      description: 'Deep'
    },{
      stat: bedtime.format('h:mm a'),
      units: null,
      description: 'Bedtime'
    }
  ];

  return stats;
};

export default {
  query,
  getAvgSleepHoursDuration,
  getSleepSummaryAvgStats,
  getSleepSummaryStats,
};
