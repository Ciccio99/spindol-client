import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserState } from 'context/userContext';

const PublicRoute = ({ authRedirectTo, ...rest }) => {
  const user = useUserState();
  const isAuthenticated = !!user._id;

  return isAuthenticated && authRedirectTo
    ? <Redirect to={authRedirectTo} />
    : <Route {...rest} />;
};

export default PublicRoute;
