import React, { useContext }from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/userContext';

const ProtectedRoute = (props) => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user._id ? true : false;

  return isAuthenticated
   ? <Route {...props}/>
   : <Redirect to='/signin'/>;
};

export default ProtectedRoute;
