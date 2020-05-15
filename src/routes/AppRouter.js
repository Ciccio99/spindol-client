import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoute';
import PublicRoute from '../routes/PublicRoute';
import SignInView from '../views/signInView/SignInView';
import DashboardView from '../views/dashboard/DashboardView';
import AccountSettings from '../views/accountSettings/AccountSettings';
import CheckInsView from '../views/checkins/CheckInsView';

const HomePage = () => (
  <h1>Home</h1>
);

const AppRouter = () => (
  <div>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <PublicRoute exact path='/login' component={SignInView} />
      <ProtectedRoute path='/dashboard' component={DashboardView} />
      <ProtectedRoute path='/dailydiary' component={CheckInsView} />
      <ProtectedRoute path='/settings' component={AccountSettings} />
      <Route render={() => <h1>404</h1>}/>
    </Switch>
  </div>
);

export default AppRouter;
