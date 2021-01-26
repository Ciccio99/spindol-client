import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserState } from 'context/userContext';

const ProtectedRoute = ({ authRedirectTo, ...props }) => {
  const user = useUserState();
  const isAuthenticated = !!user._id;

  if (isAuthenticated) {
    if (authRedirectTo) {
      return <Redirect to={authRedirectTo} />;
    }
    return <Route {...props} />;
  }

  return <Redirect to="/signin" />;
};

export default ProtectedRoute;
