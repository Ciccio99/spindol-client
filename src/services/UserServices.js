import axios from 'axios';

const logout = async () => {
  await axios.post(`${process.env.REACT_APP_API_URI}/users/logout`,
    null,
    { withCredentials: true }
  );
}

export default {
  logout,
}
