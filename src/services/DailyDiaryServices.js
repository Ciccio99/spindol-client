import moment from 'moment-timezone';
import axios from '../loaders/axios';

const query = async (match = {}, sort = {}, limit = 0, skip = 0) => {
  const queryString = JSON.stringify({
    match, sort, limit, skip,
  });

  try {
    const { data } = await axios.get('/dailyDiary',
      { params: { query: queryString } });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getByDate = async (searchDate) => {
  const date = moment(searchDate).format('YYYY-MM-DD');
  const queryString = JSON.stringify({ date });
  try {
    const { data } = await axios.get('/dailyDiary/getByDate',
      { params: { query: queryString } });
    return data;
  } catch (error) {
    return null;
  }
};

const getReportingStreak = async () => {
  try {
    const { data } = await axios.get('/dailyDiary/reportingStreak');
    return data.streak;
  } catch (error) {
    return 0;
  }
};

const getAllDailyDiary = async () => {
  const query = {
    match: {},
    sort: {
      date: -1,
    },
    limit: 30,
    skip: 0,
  };
  const queryString = JSON.stringify(query);
  try {
    const { data } = await axios.get('/dailyDiary',
      { params: { query: queryString } });
    console.log(data);
    return data;
  } catch (error) {
    return [];
  }
};

const create = async (user, date, mood) => {
  const body = {
    date,
    mood,
  };
  try {
    const { data } = await axios.post('/dailyDiary/create', body);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const upsert = async (date, mood) => {
  const body = {
    date,
    mood,
  };
  try {
    const { data } = await axios.post('/dailyDiary/upsert', body);
    return { data };
  } catch (e) {
    const error = {};
    error.message = e.message || 'Something went wrong... ';
    if ([400, 402, 401, 403].indexOf(e?.response?.status) !== -1) {
      error.message = e.response.data.message;
    };
    return { error };
  }
};

const update = async () => {
  const body = {};
  try {
    const { data } = await axios.post('/dailyDiary/update', body);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  query,
  create,
  update,
  upsert,
  getAllDailyDiary,
  getByDate,
  getReportingStreak,
};
