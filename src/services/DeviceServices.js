import axios from 'axios';

const queryOne = async (match={}, sort={}, limit=0, skip=0) => {
  const queryString = JSON.stringify({ match, sort, limit, skip });
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/devices`,
      { params: { query: queryString }  },
      { useCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getRedirectUri = async (device) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/devices/redirectUri/${device}`, )
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return '';
  }
}

export default {
  queryOne,
  getRedirectUri,
}
