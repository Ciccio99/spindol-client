import axios from 'axios';
import Cookies from 'js-cookie';
import config from 'config';

const instance = axios.create({ baseURL: config.api_uri });

// Adding Auth Token to Headers
instance.interceptors.request.use(
  (reqConfig) => {
    const newConfig = reqConfig;
    const token = Cookies.get('HypnosAuthJWT');
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.request.use(
  (reqConfig) => {
    const newConfig = reqConfig;
    newConfig.timeout = 10000;
    return newConfig;
  },
  (error) => Promise.reject(error)
);

export default instance;
