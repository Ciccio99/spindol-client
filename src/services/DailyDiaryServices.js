import moment from 'moment-timezone';
import axios from '../loaders/axios';

const query = async (match={}, sort={}, limit=0, skip=0) => {
  const queryString = JSON.stringify({ match, sort, limit, skip });

  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/dailyDiary`,
      { params: { query: queryString } }
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// const getByDate = async (searchDate) => {
//   const date = moment.utc(searchDate, 'YYYY-MM-DD');
//   const match = { date: searchDate };
//   // const match = { date: date.startOf('day') };
//   const queryString = JSON.stringify({ match });
//   try {
//     const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/dailyDiary`,
//       { params: { query: queryString } }
//     );
//     if (data.length > 0) {
//       return data[0];
//     }
//     return null;
//   } catch (error) {
//     return null;
//   }
// }

const getByDate = async (searchDate) => {
  const date = moment.utc(searchDate, 'YYYY-MM-DD');
  const queryString = JSON.stringify({ date });
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/dailyDiary/getByDate`,
      { params: { query: queryString } }
    );
    return data;
  } catch (error) {
    return null;
  }
};

const getReportingStreak = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/dailyDiary/reportingStreak`);
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
    skip:0,
  };
  const queryString = JSON.stringify(query);
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/dailyDiary`,
      { params: { query: queryString }}
    );
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
    const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/dailyDiary/create`, body);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const upsert = async (date, mood) => {
  const body = {
    date,
    mood,
  };
    const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/dailyDiary/upsert`, body);
    return data;
}

const update = async () => {
  const body = {}
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/dailyDiary/update`, body);
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
