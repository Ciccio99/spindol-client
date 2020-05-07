import axios from '../loaders/axios';
import Cookies from 'js-cookie';

const logout = async () => {
  await axios.post(`${process.env.REACT_APP_API_URI}/users/logout`);
  Cookies.remove('HypnosAuthJWT');
}

const update = async (userDTO) => {
  const { data } = await axios.patch(`${process.env.REACT_APP_API_URI}/users/me`, userDTO);
  return data.user;
};

export default {
  logout,
  update,
}
