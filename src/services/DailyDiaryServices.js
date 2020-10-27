import moment from 'moment-timezone';
import axios from '../loaders/axios';
import ErrorHandler from 'utils/ErrorHandler';

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

export const getDiariesByDateRange = async (startDate, endDate) => {
  try {
    
    const queryString = JSON.stringify({
      match: {
        date: { $gte: startDate, $lte: endDate },
      }, sort: {date: 1}, limit: 0, skip: 0,
    });
    const { data } = await axios.get('/dailyDiary',
      { params: { query: queryString } });
    return data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
};

export const getAllDiaries = async () => {
  try {
    const queryString = JSON.stringify({
      match: {}, sort: {date: 1}, limit: 0, skip: 0,
    });
    const { data } = await axios.get('/dailyDiary',
      { params: { query: queryString } });
    return data;
  } catch (e) {
    throw new ErrorHandler(e);
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

const update = async (dto) => {
  const body = dto;
  try {
    const { data } = await axios.patch(`/dailyDiary/${body._id}`, body);
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

const getDashboardData = async ({ date = moment() }) => {
  try {
    const searchDate = moment(date).format('YYYY-MM-DD');
    const queryString = JSON.stringify({ date: searchDate });
    const { data } = await axios.get('/dailyDiary/getByDate',
      { params: { query: queryString } });
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

const getTagsHeatMapData = async (startDate, endDate) => {
  try {
    const data = await query({ date: { $gte: startDate, $lte: endDate } });
    const keys = [];
    const ddMap = {};
    const tagMap = {};
    data.forEach((dd) => {
      ddMap[moment.utc(dd.date).date()] = dd.diaryTags || [];
      if (dd.diaryTags) {
        dd.diaryTags.forEach((tag) => {
          tagMap[tag._id] = { ...tag };
        });
      }
    });
    const tagKeys = Object.keys(tagMap);
    const dateIndex = moment.utc(startDate);
    while(!dateIndex.isAfter(endDate)) {
      const day = dateIndex.date();
      keys.push(`${day}`);
      if (ddMap[day]) {
        tagKeys.forEach((tagId) => {
          if (ddMap[day].some((mapTag) => mapTag._id === tagId)) {
            tagMap[tagId][day] = 1;
          } else {
            tagMap[tagId][day] = 0;
          }
        })
      } else {
        tagKeys.forEach((tagId) => {
          tagMap[tagId][day] = 0;
        });
      }
      dateIndex.add(1, 'day');
    }
    let heatMapData = Object.values(tagMap)
      .sort((a, b) => (a.tag.toLowerCase() <= b.tag.toLowerCase() ? -1 : 1));

    return { data: heatMapData, keys };
  } catch (error) {
    throw new ErrorHandler(error);
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
  getDashboardData,
  getTagsHeatMapData,
  getDiariesByDateRange,
};
