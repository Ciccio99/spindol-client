import moment from 'moment-timezone';
import { useQuery } from 'react-query';
import { getDiariesByDateRange } from 'services/DailyDiaryServices';

const startDate = moment().subtract(6, 'days').format('YYYY-MM-DD');
const endDate = moment().format('YYYY-MM-DD');

const useDashboardDiaries = () => {
  return useQuery('dashboardDiaries', async () => {
    const data = await getDiariesByDateRange(startDate, endDate);
    const date = moment(startDate);
    const end = moment(endDate);
    const diaries = [];
    while (date.diff(end, 'days') <= 0) {
      const diary = data.find((d) => d?.date && moment.utc(d.date).diff(date, 'days') === 0);
      diaries.push({
        date: date.format('YYYY-MM-DD'),
        diary: { ...diary },
      });
      date.add(1, 'day');
    }

    return diaries;
  });
};

export default useDashboardDiaries;
