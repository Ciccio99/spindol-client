import { useQuery, useQueryCache } from 'react-query';
import { getByDate } from 'services/SleepSummaryServices';
import moment from 'moment-timezone';
import { formatSleepSummary } from 'utils/sleep-utils';

const SS_KEY = 'sleepSummary';

export const useSleepSummary = (date = undefined) => {
  const queryDate = moment(date).format('YYYY-MM-DD');
  return useQuery([SS_KEY, queryDate], async () => {
    const data = await getByDate(queryDate);
    return formatSleepSummary(data);
  });
};

export const useSleepSummaryPrefetch = (date = undefined) => {
  const queryDate = moment(date).format('YYYY-MM-DD');
  const queryCache = useQueryCache();

  queryCache.prefetchQuery([SS_KEY, queryDate], async () => {
    const data = await getByDate(queryDate);
    return formatSleepSummary(data);
  });
};
