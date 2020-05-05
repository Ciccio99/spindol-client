import axios from '../loaders/axios';
import Cookies from 'js-cookie';

const logout = async () => {
  await axios.post(`${process.env.REACT_APP_API_URI}/users/logout`);
  Cookies.remove('HypnosAuthJWT');
}

export default {
  logout,
}
