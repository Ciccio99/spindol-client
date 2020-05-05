import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';
import SignInView from '../views/signInView/SignInView';
import DashboardView from '../views/dashboard/DashboardView';
import AccountSettings from '../views/accountSettings/AccountSettings';

const HomePage = () => (
  <h1>Home</h1>
);

const AppRouter = () => (
  <div>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/login' component={SignInView} />
      <ProtectedRoute path='/dashboard' component={DashboardView} />
      <ProtectedRoute path='/settings' component={AccountSettings} />
      <Route render={() => <h1>404</h1>}/>
    </Switch>
  </div>
);

export default AppRouter;
