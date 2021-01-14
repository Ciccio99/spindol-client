import { useQuery } from 'react-query';
import { getByDate } from 'services/DailyDiaryServices';
import moment from 'moment-timezone';

const useDailyDiary = (date) => {
  const queryDate = moment(date || null).format('YYYY-MM-DD');
  return useQuery(['dailyDiary', queryDate], async () => getByDate(queryDate));
};

export default useDailyDiary;
