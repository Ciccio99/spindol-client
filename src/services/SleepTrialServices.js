import ErrorHandler from 'utils/ErrorHandler';
import axios from '../loaders/axios';

export const getAllSleepTrials = async () => {
  try {
    const { data } = await axios.get('/sleepTrial');
    return data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
};
