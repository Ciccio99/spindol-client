import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/userContext';

const LoginScreen = (props) => {
  const { dispatchUser } = useContext(UserContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { from } = props.location.state || { from: { pathname: '/' }};
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    let user = undefined;
    try {
      let { data } = await axios.post(`${process.env.REACT_APP_API_URI}/users/login`, { email, password }, { withCredentials: true });
      if (data.user) {
        user = data.user;
      }
    } catch (error) {
      if ([401, 403].indexOf(error?.response?.status) !== -1) {
        setErrorMessage(error.response.data.message);
      };
    } finally {
      setLoading(false);
    }
    if (user) {
      dispatchUser({
        type: 'USER_LOGIN',
        user,
      });
      return <Redirect to={from}/>
    }
    // Make login call to API
    // Dispatch User
    // CLear both if success, clear password if wrong
  }

  if (loading) {
    return <h3>Logging in...</h3>
  }

  return (
    <form onSubmit={login}>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <label>Email</label>
      <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <label>Password</label>
      <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button>Login</button>
    </form>
  );
};

export default LoginScreen;
