import moment from 'moment-timezone';

const getHeatmapCellData = (dateTime, habits) => {
  const habitMins = dateTime.hours() * 60 + dateTime.minutes();
  let timeTarget = -1;
  let targetDiff = -1;
  for (let i = 0; i < habits.length; i += 1) {
    const habit = habits[i];
    if (habit.active) {
      if (dateTime.isSameOrAfter(habit.startDate)) {
        targetDiff = Math.abs(habitMins - habit.targetValue);
        timeTarget = moment().startOf('day').add(habit.targetValue, 'minutes');
        timeTarget = `${timeTarget.hours()}:${timeTarget.minutes() <= 9 ? `0${timeTarget.minutes()}` : timeTarget.minutes()}`;
        break;
      }
    } else if (dateTime.isBetween(habit.startDate, habit.endDate, undefined, '[]')) {
      targetDiff = Math.abs(habitMins - habit.targetValue);
      timeTarget = moment().startOf('day').add(habit.targetValue, 'minutes');
      timeTarget = `${timeTarget.hours()}:${timeTarget.minutes() <= 9 ? `0${timeTarget.minutes()}` : timeTarget.minutes()}`;
      break;
    }
  }
  const timeActual = `${dateTime.hours()}:${dateTime.minutes() < 9 ? `0${dateTime.minutes()}` : dateTime.minutes()}`;
  return {
    timeTarget,
    targetDiff,
    timeActual,
    date: dateTime.format('MMMM DD, YYYY'),
  };
};

const getHeatmapData = (sleepSummaries, bedtimeHabits, waketimeHabits) => {
  const bedtimeData = { habit: 'Bedtime' };
  const bedtimeDataAux = {};
  const waketimeData = { habit: 'Waketime' };
  const waketimeDataAux = { };
  const daysInMonth = moment(sleepSummaries[0].date).endOf('month').date();
  const keys = Array(daysInMonth).fill().map((_, i) => `${i + 1}`);
  const dummyCellData = { timeTarget: -1, targetDiff: -1, timeActual: -1 };
  const sleepSummaryMap = {};
  sleepSummaries.forEach((ss) => {
    const key = moment.utc(ss.date).date();
    sleepSummaryMap[key] = ss;
  });
  for (let day = 1; day <= daysInMonth; day += 1) {
    if (sleepSummaryMap[day]) {
      const ss = sleepSummaryMap[day];
      // Bedtime
      const bedtime = moment.utc(ss.startDateTime).add(ss.timezoneOffset, 'minutes');
      const bedtimeCellData = getHeatmapCellData(bedtime, bedtimeHabits);
      const { targetDiff: bedtimeDiff, ...bedtimeAuxData } = bedtimeCellData;
      bedtimeData[day] = bedtimeDiff;
      bedtimeDataAux[day] = bedtimeAuxData;
      // Waketime
      const waketime = moment.utc(ss.endDateTime).add(ss.timezoneOffset, 'minutes');
      const waketimeCellData = getHeatmapCellData(waketime, waketimeHabits);
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
