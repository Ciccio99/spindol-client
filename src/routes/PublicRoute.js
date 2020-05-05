import React, { useContext }from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/userContext';

const PublicRoute = (props) => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user._id ? true : false;

  return isAuthenticated
    ? <Redirect to='/dashboard'/>
    : <Route {...props}/>;
};

export default PublicRoute;
