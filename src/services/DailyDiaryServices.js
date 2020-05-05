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

const create = async (user, date, mood) => {
  const body = {
    date,
    mood,
    owner: user._id,
  };
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/dailyDiary/create`, body);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const upsert = async (user, date, mood) => {
  const body = {
    date,
    mood,
    owner: user._id,
  };
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/dailyDiary/upsert`, body);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
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
};
