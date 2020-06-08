import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/userContext';

const PublicRoute = ({ authRedirectTo, ...rest }) => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user._id ? true : false;

  return isAuthenticated && authRedirectTo
    ? <Redirect to={authRedirectTo} />
    : <Route {...rest} />;
};

export default PublicRoute;
