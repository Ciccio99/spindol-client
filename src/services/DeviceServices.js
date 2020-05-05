import axios from '../loaders/axios';

const queryOne = async (match={}, sort={}, limit=0, skip=0) => {
  const queryString = JSON.stringify({ match, sort, limit, skip });
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/devices`,
      {
        params: { query: queryString },
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getRedirectUri = async (device) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/devices/redirectUri/${device}`,
      { withCredentials: true },
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return '';
  }
};

const revokeDeviceAccess = async (device) => {
  try {
    if (!device) {
      throw new Error('Must include a device to disconnect from!');
    }
    await axios.get(`${process.env.REACT_APP_API_URI}/devices/auth/${device}/revoke`,
      { withCredentials: true },
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

 const syncDeviceData = async (device) => {
  if (!device) {
    throw new Error('Must provide device to sync. [oura, fitbit, withings]');
  }
  try {
    await axios.get(`${process.env.REACT_APP_API_URI}/devices/sync/${device}`,
      { withCredentials: true },
    );
    return true;
  } catch (error) {
    // Todo add failed to sync banner/warning w/e
    console.error(error);
    return false;
  }
 }

export default {
  queryOne,
  getRedirectUri,
  revokeDeviceAccess,
  syncDeviceData,
}
