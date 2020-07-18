import moment from 'moment-timezone';

const MINUTES_IN_DAY = 1440;
const MINUTES_IN_HALF_DAY = 720;

const getBedtimeCellData = (ss, habits) => {
  const date = moment.utc(ss.date);
  const bedDateTime = moment.utc(ss.startDateTime).utcOffset(ss.timezoneOffset);
  const habitMins = bedDateTime.hours() * 60 + bedDateTime.minutes();
  let timeTarget = -1;
  let targetDiff = -1;
  for (let i = 0; i < habits.length; i += 1) {
    const habit = habits[i];
    if (
      (habit.active && bedDateTime.isSameOrAfter(habit.startDate))
      || bedDateTime.isBetween(habit.startDate, habit.endDate, undefined, '[]')
    ) {
      if (habit.targetValue > MINUTES_IN_HALF_DAY || habitMins > MINUTES_IN_HALF_DAY) {
        targetDiff = Math.abs(Math.abs(habitMins - habit.targetValue) - MINUTES_IN_DAY);
      } else {
        targetDiff = Math.abs(habitMins - habit.targetValue);
      }
      timeTarget = moment().startOf('day').add(habit.targetValue, 'minutes');
      timeTarget = `${timeTarget.hours()}:${timeTarget.minutes() <= 9 ? `0${timeTarget.minutes()}` : timeTarget.minutes()}`;
      break;
    }
  }
  const timeActual = `${bedDateTime.hours()}:${bedDateTime.minutes() < 9 ? `0${bedDateTime.minutes()}` : bedDateTime.minutes()}`;
  return {
    timeTarget,
    targetDiff,
    timeActual,
    date: date.format('MMMM DD, YYYY'),
  };
};

const getWaketimeCellData = (ss, habits) => {
  const date = moment.utc(ss.date);
  const wakeDateTime = moment.utc(ss.endDateTime).utcOffset(ss.timezoneOffset);
  const habitMins = wakeDateTime.hours() * 60 + wakeDateTime.minutes();
  let timeTarget = -1;
  let targetDiff = -1;
  for (let i = 0; i < habits.length; i += 1) {
    const habit = habits[i];
    if (
      (habit.active && wakeDateTime.isSameOrAfter(habit.startDate))
      || wakeDateTime.isBetween(habit.startDate, habit.endDate, undefined, '[]')
    ) {
      targetDiff = Math.abs(habitMins - habit.targetValue);
      timeTarget = moment().startOf('day').add(habit.targetValue, 'minutes');
      timeTarget = `${timeTarget.hours()}:${timeTarget.minutes() <= 9 ? `0${timeTarget.minutes()}` : timeTarget.minutes()}`;
      break;
    }
  }
  const timeActual = `${wakeDateTime.hours()}:${wakeDateTime.minutes() < 9 ? `0${wakeDateTime.minutes()}` : wakeDateTime.minutes()}`;
  return {
    timeTarget,
    targetDiff,
    timeActual,
    date: date.format('MMMM DD, YYYY'),
  };
};

const getHeatmapData = (sleepSummaries, bedtimeHabits, waketimeHabits, startDate, endDate, dateView = 'month') => {
  const bedtimeData = { habit: 'Bedtime' };
  const bedtimeDataAux = {};
  const waketimeData = { habit: 'Waketime' };
  const waketimeDataAux = { };
  const keys = [];
  const dummyCellData = { timeTarget: -1, targetDiff: -1, timeActual: -1 };
  const sleepSummaryMap = {};
  sleepSummaries.forEach((ss) => {
    const key = moment.utc(ss.date).date();
    sleepSummaryMap[key] = ss;
  });
  const dayDate = moment(startDate);
  const finalDay = moment(endDate);
  while (!dayDate.isAfter(finalDay)) {
    const day = dayDate.date();
    keys.push(`${day}`);
    if (sleepSummaryMap[day]) {
      const ss = sleepSummaryMap[day];
      // Bedtime

      const bedtimeCellData = getBedtimeCellData(ss, bedtimeHabits);
      const { targetDiff: bedtimeDiff, ...bedtimeAuxData } = bedtimeCellData;
      bedtimeData[day] = bedtimeDiff;
      bedtimeDataAux[day] = bedtimeAuxData;
      // Waketime

      const waketimeCellData = getWaketimeCellData(ss, waketimeHabits);
      const { targetDiff: waketimeDiff, ...waketimeAuxData } = waketimeCellData;
      waketimeData[day] = waketimeDiff;
      waketimeDataAux[day] = waketimeAuxData;
    } else {
      const { targetDiff, ...auxData } = dummyCellData;
      bedtimeData[day] = targetDiff;
      bedtimeDataAux[day] = auxData;
      waketimeData[day] = targetDiff;
      waketimeDataAux[day] = auxData;
    }
    dayDate.add(1, 'day');
  }

  return {
    data: [bedtimeData, waketimeData],
    auxData: { Bedtime: bedtimeDataAux, Waketime: waketimeDataAux },
    keys,
  };
};

const mapDiffToColor = (diff) => {
  if (diff <= 0) return '#CCCCCC';
  if (diff <= 30) return 'rgb(143, 239, 155)';
  if (diff <= 60) return 'rgba(250,200,86,1)';
  if (diff <= 90) return 'rgba(230,126,86,1)';
  return 'rgba(218,80,87,1)';
};

export default {
  getHeatmapData,
  mapDiffToColor,
};
