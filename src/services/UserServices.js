import Cookies from 'js-cookie';
import axios from '../loaders/axios';
import ErrorHandler from 'utils/ErrorHandler';

const signUp = async (email, name, password, confirmPassword, token = undefined) => {
  try {
    if (password !== confirmPassword) {
      throw new Error('Passwords must match.');
    }

    if (name.length === 0) {
      throw new Error('Full name required.');
    }
    const body = { email, name, password, confirmPassword };
    if (token) {
      body.token = token;
    }

    let { data } = await axios.post(`/users/register`, body);

    if (data.user && data.token) {
      Cookies.set('HypnosAuthJWT', data.token, { expires: 7 })
    }
    return { user: data.user };
  } catch (e) {
    const error = {};
    error.message = e.message || 'Something went wrong... ';
    if ([400, 402, 401, 403].indexOf(e?.response?.status) !== -1) {
      error.message = e.response.data.message;
    };
    return { error };
  }
};

const signIn = async (email, password) => {
  try {
    const { data } = await axios.post(`/users/login`, { email, password });
    if (data.user && data.token) {
      Cookies.set('HypnosAuthJWT', data.token, { expires: 7 });
      return { user: data.user };
    }
  } catch (e) {
    const error = {};
    error.message = e.message || 'Something went wrong... ';
    if ([401, 403].indexOf(e?.response?.status) !== -1) {
      error.message = e.response.data.message;
    };
    return { error };
  }
};

const tokenSignIn = async () => {
  try {
    const token = Cookies.get('HypnosAuthJWT');
    if (!token) {
      throw new Error('No token');
    }
    const { data } = await axios.post(`/users/token-login`);
    if (data.user && data.token) {
      Cookies.set('HypnosAuthJWT', data.token, { expires: 7 });
      return { user: data.user };
    }
  } catch (e) {
    const error = {};
    error.message = e.message || 'Something went wrong... ';
    if ([401, 403].indexOf(e?.response?.status) !== -1) {
      error.message = e.response.data.message;
    };
    return { error };
  }
};

const logout = async () => {
  await axios.post(`/users/logout`);
  Cookies.remove('HypnosAuthJWT');
};

const update = async (userDTO) => {
  const { data } = await axios.patch('/users/me', userDTO);
  return data.user;
};

const insertUserTags = async (tags) => {
  try {
    const dto = { tags };
    const { data } = await axios.put('/users/me/tags', dto);
    return data.tags
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

const getAdmins = async () => {
  try {
    const { data } = await axios.get('/users', {
      params: {
        role: 'admin',
      },
    });
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
}

export default {
  signUp,
  signIn,
  tokenSignIn,
  logout,
  update,
  insertUserTags,
  getAdmins,
};
