import axios from 'axios';

const query = async (match={}, sort={}, limit=0, skip=0) => {
  const queryString = JSON.stringify({ match, sort, limit, skip });

  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/sleepTrial`,
      { params: { query: queryString }  },
      { useCredentials: true }
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
