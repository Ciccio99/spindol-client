import { useQuery, useQueryCache } from 'react-query';
import { getAllSleepTrials } from 'services/SleepTrialServices';

export const useSleepTrials = () =>
  useQuery(['sleepTrials'], getAllSleepTrials);

export const useSleepTrialsPrefetch = () => {
  const queryCache = useQueryCache();
  queryCache.prefetchQuery(['sleepTrials'], getAllSleepTrials);
};
