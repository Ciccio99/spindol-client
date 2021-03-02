import { useQuery } from 'react-query';
import { getCurrentStreak } from 'services/DailyDiaryServices';

const useStreakStats = () => useQuery('streakStats', getCurrentStreak);

export default useStreakStats;
