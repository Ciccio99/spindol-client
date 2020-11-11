import moment from 'moment-timezone';
import { useQuery } from 'react-query';
import { getSleepByDateRange } from 'services/SleepSummaryServices';

const startDate = moment().subtract(9, 'days').format('YYYY-MM-DD');
const endDate = moment().format('YYYY-MM-DD');

const useDashboardSleep = () => useQuery('dashboardSleep', async () => {
  const data = await getSleepByDateRange(startDate, endDate);
  return data;
});

export default useDashboardSleep;
