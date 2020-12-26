import { useQuery } from 'react-query';
import { getUserMe } from 'services/UserServices';

const useStreakStats = () => {
  return useQuery('sessionStats', async () => {
    const data = await getUserMe();
    return data.user?.stats?.sessionStats || {};
  });
};

export default useStreakStats;
