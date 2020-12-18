import { useQuery } from 'react-query';
import { getTodayDiary } from 'services/DailyDiaryServices';

const useTodayDiary = () => useQuery('dailyDiary', getTodayDiary);

export default useTodayDiary;
