import moment from 'moment-timezone';
import { useQuery } from 'react-query';
import { getDashboardComparisonData } from 'services/SleepSummaryServices';

const useDashboardDiaries = (date) => useQuery(
  ['sleepComparison', moment(date || undefined).format('YYYY-MM-DD')],
  async () => getDashboardComparisonData({ searchDate: date }),
);

export default useDashboardDiaries;
