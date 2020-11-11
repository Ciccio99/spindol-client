import { useQuery } from 'react-query';
import { getHabitsByDate } from 'services/HabitServices';

const useHabits = (start, end) => useQuery(['habits', start, end], async () => {
  const data = await getHabitsByDate(start, end);
  const formattedData = data.reduce((result, habit) => {
    if (!result[habit.dataType]) {
      // eslint-disable-next-line no-param-reassign
      result[habit.dataType] = [habit];
    } else {
      result[habit.dataType].push(habit);
    }

    return result;
  }, {});

  return formattedData;
});

export default useHabits;
