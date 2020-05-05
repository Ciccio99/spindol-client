import axios from 'axios';
import Cookies from 'js-cookie';

const logout = async () => {
  await axios.post(`${process.env.REACT_APP_API_URI}/users/logout`,
    null,
    { withCredentials: true }
  );
  Cookies.remove('HypnosAuthJWT');
}

export default {
  logout,
}
