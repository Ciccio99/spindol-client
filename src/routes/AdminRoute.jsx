import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserState } from 'context/userContext';
import { ADMIN_ROLE } from 'constants/Roles';

const AdminRoute = (props) => {
  const user = useUserState();
  const isAuthenticated = !!user._id && user.role === ADMIN_ROLE;

  return isAuthenticated
    ? <Route {...props} />
    : <Redirect to="/dashboard" />;
};

export default AdminRoute;
