import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';
import PublicRoute from 'routes/PublicRoute';
import SignInView from 'views/signInView/SignInView';
// import RegisterView from 'views/registerView/RegisterView';
import DashboardView from 'views/dashboard/DashboardView';
import AccountSettings from 'views/accountSettings/AccountSettings';
import CheckInsView from 'views/checkins/CheckInsView';
import NotFound from 'views/notFound/NotFound';
import usePageTracker from 'hooks/usePageTracker';
import DataView from 'views/DataView';
import CheckIn from 'views/CheckIn';

const AppRouter = () => {
  usePageTracker();

  return (
    <Switch>
      <ProtectedRoute exact path="/" component={DashboardView} />
      <PublicRoute path="/signin" authRedirectTo="/" component={SignInView} />

      {/* TODO: Comes back for beta participants */}
      {/* <PublicRoute path="/register/:token" authRedirectTo="/dashboard" component={RegisterView} /> */}
      {/* <PublicRoute path="/register" authRedirectTo="/dashboard" component={RegisterView} /> */}
      <ProtectedRoute path="/check-in" component={CheckIn} />
      <ProtectedRoute path="/dashboard" authRedirectTo="/" component={DashboardView} />
      <ProtectedRoute path="/daily-diary" component={CheckInsView} />
      <ProtectedRoute path="/data" component={DataView} />
      <ProtectedRoute path="/settings" component={AccountSettings} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRouter;
