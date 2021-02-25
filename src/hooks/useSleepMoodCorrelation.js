import moment from 'moment-timezone';
import { useQuery } from 'react-query';
import { getDiariesByDateRange } from 'services/DailyDiaryServices';
import { getSleepHoursDuration } from 'services/SleepSummaryServices';

const startDate = moment().subtract(15, 'days').format('YYYY-MM-DD');
const endDate = moment().format('YYYY-MM-DD');

const useSleepMoodCorrelation = () =>
  useQuery(['sleepMoodCorrelation'], async () => {
    const data = await getDiariesByDateRange(startDate, endDate);
    const moodSleepMap = {};
    data.forEach((dd) => {
      const ss = dd.sleepSummary;
      if (dd.mood && ss) {
        if (moodSleepMap[dd.mood]) {
          moodSleepMap[dd.mood].totalTime += getSleepHoursDuration(ss);
          moodSleepMap[dd.mood].count += 1;
        } else {
          moodSleepMap[dd.mood] = {
            totalTime: getSleepHoursDuration(ss),
            count: 1,
          };
        }
      }
    });
    Object.keys(moodSleepMap).forEach((key) => {
      moodSleepMap[key].average =
        moodSleepMap[key].totalTime / moodSleepMap[key].count;
    });
    return moodSleepMap;
  });

export default useSleepMoodCorrelation;
