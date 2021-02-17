import { useQuery } from 'react-query';
import { getActiveHabits } from 'services/HabitServices';
import moment from 'moment-timezone';
import HABITS from 'constants/Habits';

const DEFAULT_WAKETIME_HABIT = {
  name: 'Waketime',
  startDate: moment().format('YYYY-MM-DD'),
  dataType: HABITS.WAKETIME,
  targetValue: 480,
  default: true,
};

const DEFAULT_BEDTIME_HABIT = {
  name: 'Bedtime',
  startDate: moment().format('YYYY-MM-DD'),
  dataType: HABITS.BEDTIME,
  targetValue: 1380,
  default: true,
};

const useActiveHabits = () =>
  useQuery('activeHabits', async () => {
    const { data } = await getActiveHabits();
    const formattedData = data.reduce((result, habit) => {
      // eslint-disable-next-line no-param-reassign
      result[habit.dataType] = habit;
      return result;
    }, {});

    if (!formattedData[HABITS.WAKETIME]) {
      formattedData[HABITS.WAKETIME] = DEFAULT_WAKETIME_HABIT;
    }

    if (!formattedData[HABITS.BEDTIME]) {
      formattedData[HABITS.BEDTIME] = DEFAULT_BEDTIME_HABIT;
    }

    return formattedData;
  });

export default useActiveHabits;
