import moment from 'moment-timezone';
import axios from 'loaders/axios';
import handleError from 'utils/handleError';
import HabitUtils from 'utils/HabitUtils';
import dateViews from 'constants/dateViews';

const DATA_TYPES = {
  BEDTIME: 'bedtime',
  WAKETIME: 'waketime',
};

const getDashboardData = async (startDate, endDate, dateView = dateViews.M) => {
  let start = startDate;
  let end = endDate;
  console.log(start);
  console.log(end);
  if (!start) {
    start = moment().startOf('month').format('YYYY-MM-DD');
  }
  if (!end) {
    end = moment().endOf('month').format('YYYY-MM-DD');
  }

  try {
    const bedtimeReq = axios.get('/habits', {
      params: {
        limit: 0,
        dataType: DATA_TYPES.BEDTIME,
        rangeDateStart: start,
        rangeDateEnd: end,
      },
    });
    const waketimeReq = axios.get('/habits', {
      params: {
        limit: 0,
        dataType: DATA_TYPES.WAKETIME,
        rangeDateStart: start,
        rangeDateEnd: end,
      },
    });
    const query = JSON.stringify({
      match: {
        date: { $gte: start, $lte: end },
      },
      limit: 0,
    });
    const sleepReq = axios.get('/sleepSummary', {
      params: {
        query,
      },
    });

    const responses = await Promise.all([bedtimeReq, waketimeReq, sleepReq]);
    const bedtimeHabits = responses[0].data.length > 0 ? responses[0].data : [];
    const waketimeHabits = responses[1].data.length > 0 ? responses[1].data : [];
    const sleepSummaries = responses[2].data.length > 0 ? responses[2].data : [];
    const heatmapData = HabitUtils
      .getHeatmapData(sleepSummaries, bedtimeHabits, waketimeHabits, startDate, endDate, dateView);
    const activeBedtimeHabit = bedtimeHabits.find((habit) => habit.active);
    const activeWaketimeHabit = waketimeHabits.find((habit) => habit.active);
    const data = { bedtime: activeBedtimeHabit, waketime: activeWaketimeHabit, heatmapData };

    return { data };
  } catch (error) {
    return handleError(error);
  }
};

const upsert = async (name, dataType, startDate, targetValue) => {
  const dto = {
    name, startDate, targetValue, dataType,
  };
  try {
    const { data } = await axios.post('/habits/upsert', dto);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

const upsertBedtimeHabit = async (targetValue) => {
  const dto = {
    name: 'Bedtime',
    startDate: moment().format('YYYY-MM-DD'),
    targetValue,
    dataType: 'bedtime',
  };

  try {
    const { data } = await axios.post('/habits/upsert', dto);
    return { data };
  } catch (error) {
    return handleError(error);
  }
};

const upsertWaketimeHabit = async (targetValue) => {
  const dto = {
    name: 'Waketime',
    startDate: moment().format('YYYY-MM-DD'),
    targetValue,
    dataType: 'waketime',
  };

  try {
    const { data } = await axios.post('/habits/upsert', dto);
    return { data };
  } catch (error) {
    return handleError(error);
  }
};

export default {
  getDashboardData,
  upsert,
  upsertBedtimeHabit,
  upsertWaketimeHabit,
};
