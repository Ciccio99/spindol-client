import axios from '../loaders/axios';

const queryOne = async (match = {}, sort = {}, limit = 0, skip = 0) => {
  const queryString = JSON.stringify({
    match, sort, limit, skip,
  });
  try {
    const { data } = await axios.get(`/devices`,
      {
        params: { query: queryString },
      });

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getRedirectUri = async (device) => {
  try {
    const { data } = await axios.get(`/devices/redirectUri/${device}`);
    return data;
  } catch (error) {
    return '';
  }
};

const revokeDeviceAccess = async (device) => {
  try {
    if (!device) {
      throw new Error('Must include a device to disconnect from!');
    }
    await axios.get(`/devices/auth/${device}/revoke`);
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
    await axios.get(`/devices/sync/${device}`);
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  queryOne,
  getRedirectUri,
  revokeDeviceAccess,
  syncDeviceData,
};
