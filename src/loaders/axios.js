import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create();

instance.interceptors.request.use((config) => {
  const token = Cookies.get('HypnosAuthJWT');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
