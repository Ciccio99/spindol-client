import { useQuery } from 'react-query';
import { getActiveHabits } from 'services/HabitServices';

const useActiveHabits = () => useQuery('activeHabits', async () => {
  const { data } = await getActiveHabits();
  const formattedData = data.reduce((result, habit) => {
    // eslint-disable-next-line no-param-reassign
    result[habit.dataType] = habit;
    return result;
  }, {});

  return formattedData;
});

export default useActiveHabits;
