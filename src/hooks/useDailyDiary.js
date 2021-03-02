import { useQuery, useQueryCache, useMutation } from 'react-query';
import {
  getByDate,
  update,
  updateActivities,
} from 'services/DailyDiaryServices';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import moment from 'moment-timezone';

export const useDailyDiary = (date = undefined) => {
  const queryDate = moment(date).format('YYYY-MM-DD');
  return useQuery(['dailyDiary', queryDate], async () => getByDate(queryDate));
};

export const useDailyDiaryPrefetch = (date) => {
  const dateString = moment(date).format('YYYY-MM-DD');
  const queryCache = useQueryCache();

  queryCache.prefetchQuery(['dailyDiary', dateString], async () =>
    getByDate(dateString)
  );
};

export const useUpdateDailyDiary = () => {
  const dispatchAlert = useAlertSystemDispatch();
  const queryCache = useQueryCache();

  const [updateDailyDiary] = useMutation(({ data }) => update(data), {
    onMutate: ({ data, date }) => {
      queryCache.cancelQueries(['dailyDiary', date]);
      const oldData = queryCache.getQueryData(['dailyDiary', date]);
      queryCache.setQueryData(['dailyDiary', date], (prevData) => ({
        ...prevData,
        ...data,
      }));

      return () => queryCache.setQueryData(['dailyDiary', date], oldData);
    },
    onSuccess: (data, { date }) => {
      queryCache.setQueryData(['dailyDiary', date], data);
      queryCache.invalidateQueries(['dailyDiary', date]);
    },
    onError: (error, values, rollback) => {
      dispatchAlert({
        type: 'ERROR',
        message: error.message,
      });
      if (rollback) {
        rollback();
      }
    },
  });

  return { updateDailyDiary };
};

export const useUpdateDailyDiaryActivities = () => {
  const dispatchAlert = useAlertSystemDispatch();
  const queryCache = useQueryCache();

  const [updateDailyDiaryActivities] = useMutation(
    ({ data }) => updateActivities(data),
    {
      onMutate: ({ data, date }) => {
        queryCache.cancelQueries(['dailyDiary', date]);
        const oldData = queryCache.getQueryData(['dailyDiary', date]);
        queryCache.setQueryData(['dailyDiary', date], (prevData) => ({
          ...prevData,
          ...data,
        }));

        return () => queryCache.setQueryData(['dailyDiary', date], oldData);
      },
      onSuccess: (data, { date }) => {
        queryCache.setQueryData(['dailyDiary', date], data);
        queryCache.invalidateQueries(['dailyDiary', date]);
      },
      onError: (error, values, rollback) => {
        dispatchAlert({
          type: 'ERROR',
          message: error.message,
        });
        if (rollback) {
          rollback();
        }
      },
    }
  );

  return { updateDailyDiaryActivities };
};

export default useDailyDiary;
