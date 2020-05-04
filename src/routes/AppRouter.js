import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';
import SignInScreen from '../screens/signInScreen/SignInScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AccountSettings from '../views/accountSettings/AccountSettings';

const HomePage = () => (
  <h1>Home</h1>
);

const AppRouter = () => (
  <div>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/login' component={SignInScreen} />
      <ProtectedRoute path='/dashboard' component={DashboardScreen} />
      <ProtectedRoute path='/settings' component={AccountSettings} />
      <Route render={() => <h1>404</h1>}/>
    </Switch>
  </div>
);

export default AppRouter;
