import axios from 'axios';

const querySleepTrialTracker = async (match={}, sort={}, limit=0, skip=0) => {
  const body = { match, sort, limit, skip };
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/sleepTrialTracker`
      , body
      , { useCredentials: true }
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
    owner: user._id,
  };
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/sleepTrialTracker/create`,
      body,
      { useCredentials: true},
    );
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}


export default {
  querySleepTrialTracker,
  create,
};
