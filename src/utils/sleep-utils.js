import moment from 'moment-timezone';

const msToHour = (ms) => {
  return ms / 3600000;
};

const secToHour = (secs) => {
  return secs / 3600;
};

const secToMin = (secs) => {
  return secs / 60;
};

export const calcSleepDuration = (start, end, efficiency = 100) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  let diffHours = msToHour(diffTime);
  diffHours *= efficiency / 100;
  return diffHours;
};

const getSleepDuration = (ss) => {
  if (!ss.startDateTime || !ss.endDateTime) return null;

  return {
    sleepDuration: {
      stat: calcSleepDuration(
        ss.startDateTime,
        ss.endDateTime,
        ss.efficiency
      ).toFixed(1),
      units: 'hrs',
      description: 'Total Sleep',
    },
  };
};

const getRemDuration = (ss) => {
  if (!ss.remSleepDuration) return null;

  return {
    remDuration: {
      stat: secToHour(ss.remSleepDuration).toFixed(1),
      units: 'hrs',
      description: 'REM',
    },
  };
};

const getDeepDuration = (ss) => {
  if (!ss.deepSleepDuration) return null;

  return {
    deepDuration: {
      stat: secToHour(ss.deepSleepDuration).toFixed(1),
      units: 'hrs',
      description: 'Deep',
    },
  };
};

const getLightDuration = (ss) => {
  if (!ss.lightSleepDuration) return null;

  return {
    lightDuration: {
      stat: secToHour(ss.lightSleepDuration).toFixed(1),
      units: 'hrs',
      description: 'Light',
    },
  };
};

const getBedtime = (ss) => {
  if (!ss.startDateTime) return null;

  let bedtime = moment.utc(ss.startDateTime);
  bedtime = bedtime.add(ss.timezoneOffset || 0, 'minutes');

  return {
    bedtime: {
      stat: bedtime.format('h:mm a'),
      units: null,
      description: 'Bedtime',
    },
  };
};

const getWakeTime = (ss) => {
  if (!ss.endDateTime) return null;

  let waketime = moment.utc(ss.endDateTime);
  waketime = waketime.add(ss.timezoneOffset || 0, 'minutes');

  return {
    waketime: {
      stat: waketime.format('h:mm a'),
      units: null,
      description: 'Waketime',
    },
  };
};

const getAvgHeartRate = (ss) => {
  if (!ss.hrAverage) return null;
  return {
    avHr: {
      stat: ss.hrAverage,
      units: 'bpm',
      description: 'Avg HR',
    },
  };
};

const getMinHeartRate = (ss) => {
  if (!ss.hrMin) return null;
  return {
    minHr: {
      stat: ss.hrMin,
      units: 'bpm',
      description: 'Min HR',
    },
  };
};

const getLatency = (ss) => {
  if (!ss.latency) return null;
  return {
    latency: {
      stat: secToMin(ss.latency),
      units: 'mins',
      description: 'Latency',
    },
  };
};

const getEfficiency = (ss) => {
  if (!ss.efficiency) return null;
  return {
    efficiency: {
      stat: ss.efficiency,
      units: '%',
      description: 'Efficiency',
    },
  };
};

export const formatSleepSummary = (sleepSummary) => {
  const stats = {
    ...getSleepDuration(sleepSummary),
    ...getRemDuration(sleepSummary),
    ...getDeepDuration(sleepSummary),
    ...getLightDuration(sleepSummary),
    ...getLatency(sleepSummary),
    ...getEfficiency(sleepSummary),
    ...getBedtime(sleepSummary),
    ...getWakeTime(sleepSummary),
    ...getAvgHeartRate(sleepSummary),
    ...getMinHeartRate(sleepSummary),
  };
  return stats;
};
