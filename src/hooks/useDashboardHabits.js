import { useQuery } from 'react-query';
import moment from 'moment-timezone';
import { getSleepByDateRange } from 'services/SleepSummaryServices';
import { getHabitsByDate } from 'services/HabitServices';

const getBedtimeStats = (sleep, habit) => {
  if (!sleep || !habit) {
    return undefined;
  }
  const sleepBedtime = moment(sleep.startDateTime)
    .utc()
    .utcOffset(sleep.timezoneOffset);
  const targetDateTime = moment(sleep.date, 'YYYY-MM-DD')
    .add(habit.targetValue, 'minutes')
    .utc()
    .utcOffset(sleep.timezoneOffset);

  if (habit.targetValue >= 840) {
    targetDateTime.subtract(1, 'day');
  }

  const delta = sleepBedtime.diff(targetDateTime, 'minutes');
  const target = targetDateTime.local(true).format('LT');
  const bedtime = sleepBedtime.local(true).format('LT');

  return {
    delta,
    target,
    bedtime,
  };
};

const getWaketimeStats = (sleep, habit) => {
  if (!sleep || !habit) {
    return undefined;
  }
  const sleepWaketime = moment(sleep.endDateTime)
    .utc()
    .utcOffset(sleep.timezoneOffset);
  const targetDateTime = moment(sleep.date, 'YYYY-MM-DD')
    .add(habit.targetValue, 'minutes')
    .utc()
    .utcOffset(sleep.timezoneOffset);

  const delta = sleepWaketime.diff(targetDateTime, 'minutes');
  const target = targetDateTime.local(true).format('LT');
  const waketime = sleepWaketime.local(true).format('LT');

  return {
    delta,
    target,
    waketime,
  };
};

const useDashboardHabits = () =>
  useQuery(['dashboard', 'habits'], async () => {
    const startDate = moment().subtract(6, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');

    const [sleepSummaries, curHabits] = await Promise.all([
      getSleepByDateRange(startDate, endDate),
      getHabitsByDate(startDate, endDate),
    ]);
    const habits = curHabits.reduce((result, habit) => {
      if (!result[habit.dataType]) {
        // eslint-disable-next-line no-param-reassign
        result[habit.dataType] = [habit];
      } else {
        result[habit.dataType].push(habit);
      }

      return result;
    }, {});

    if (sleepSummaries && habits) {
      const date = moment(startDate);
      const end = moment(endDate);
      const data = [];
      while (date.diff(end, 'days') <= 0) {
        const sleep = sleepSummaries.find(
          (ss) =>
            moment.utc(ss.date).format('YYYY-MM-DD') ===
            date.format('YYYY-MM-DD')
        );
        if (sleep) {
          const sleepDate = moment.utc(sleep.date);
          const bedtimeHabit = habits.bedtime.find((habit) =>
            sleepDate.isBetween(
              habit.startDate,
              habit.endDate || moment(),
              undefined,
              '[]'
            )
          );

          const waketimeHabit = habits.waketime.find((habit) =>
            sleepDate.isBetween(
              habit.startDate,
              habit.endDate || moment(),
              undefined,
              '[]'
            )
          );
          const bedtime = getBedtimeStats(sleep, bedtimeHabit);
          const waketime = getWaketimeStats(sleep, waketimeHabit);
          data.push({
            date: date.format('MMM DD'),
            sleep,
            bedtime,
            waketime,
          });
        } else {
          data.push({
            date: date.format('MMM DD'),
          });
        }

        date.add(1, 'day');
      }

      return data;
    }

    return undefined;
  });

export default useDashboardHabits;
