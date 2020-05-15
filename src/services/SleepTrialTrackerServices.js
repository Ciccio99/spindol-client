import axios from '../loaders/axios';

const querySleepTrialTracker = async (match={}, sort={}, limit=0, skip=0) => {
  const queryString = JSON.stringify({ match, sort, limit, skip });
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/sleepTrialTracker`,
      {
        params: { query: queryString },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const create = async (user, sleepTrial) => {
  const body = {
    sleepTrial: sleepTrial._id,
    trialLength: sleepTrial.trialLength,
  };
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/sleepTrialTracker/create`,
      body,
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const addCheckIn = async (_id, date, completed) => {
  const body = {
    _id,
    checkIn: {
      date,
      completed,
    }
  };
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/sleepTrialTracker/add/checkIn`,
      body,
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export default {
  querySleepTrialTracker,
  create,
  addCheckIn,
};
