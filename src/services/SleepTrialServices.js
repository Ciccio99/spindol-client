import axios from '../loaders/axios';

const query = async (match={}, sort={}, limit=0, skip=0) => {
  const queryString = JSON.stringify({ match, sort, limit, skip });

  try {
    const { data } = await axios.get(`/sleepTrial`,
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


export default {
  query,
};
