import axios from '../loaders/axios';
import moment from 'moment-timezone';
import ErrorHandler from 'utils/ErrorHandler';

const querySleepTrialTracker = async (match = {}, sort = {}, limit = 0, skip = 0) => {
  const queryString = JSON.stringify({
    match, sort, limit, skip,
  });
  try {
    const { data } = await axios.get(`/sleepTrialTracker`,
      {
        params: { query: queryString },
      });
    return data;
  } catch (error) {
    return [];
  }
};

const getByDate = async ({ date = undefined }) => {
  try {
    const searchDate = moment(date).format('YYYY-MM-DD')
    const query = JSON.stringify({
      match: {
        $or: [
          {
            startDate: { $lte: searchDate },
            endDate: { $gte: searchDate },
          },
          {
            startDate: {$lte: searchDate },
            endDate: { $exists: false },
          }
        ]

      },
      sort: {},
      skip: 0,
      limit: 0,
    });
    const { data } = await axios.get('/sleepTrialTracker', {
       params: { query },
      });
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
}

const getById = async (id) => {
  try {
    const { data } = await axios.get(`/sleepTrialTracker/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};

const create = async (sleepTrial) => {
  const body = {
    startDate: moment().format('YYYY-MM-DD'),
    sleepTrial: sleepTrial._id,
    trialLength: sleepTrial.trialLength,
  };
  try {
    const { data } = await axios.post(`/sleepTrialTracker/create`,
      body);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addCheckIn = async (_id, date, completed) => {
  const body = {
    _id,
    checkIn: {
      date,
      completed,
    },
  };
  try {
    const { data } = await axios.post(`/sleepTrialTracker/add/checkIn`,
      body);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const removeById = async (id) => {
  try {
    await axios.delete(`/sleepTrialTracker/${id}`);
    return { success: true };
  } catch (e) {
    const error = {};
    error.message = e.message || 'Something went wrong... ';
    if ([404].indexOf(e?.response?.status) !== -1) {
      error.message = e.response.data.message;
    };
    return { error };
  }
}


export default {
  querySleepTrialTracker,
  getByDate,
  create,
  addCheckIn,
  getById,
  removeById,
};
