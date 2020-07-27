import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserState } from 'context/userContext';

const ProtectedRoute = (props) => {
  const user = useUserState();
  const isAuthenticated = !!user._id;

  return isAuthenticated
    ? <Route {...props} />
    : <Redirect to="/signin" />;
};

export default ProtectedRoute;
