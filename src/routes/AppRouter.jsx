import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { updateIntercom } from 'next-intercom';
import ProtectedRoute from 'routes/ProtectedRoute';
import PublicRoute from 'routes/PublicRoute';
import SignInView from 'views/SignInView';
// import RegisterView from 'views/registerView/RegisterView';
import DashboardView from 'views/DashboardView';
import AccountSettings from 'views/AccountSettings';
import DailyDiary from 'views/DailyDiary';
import NotFound from 'views/Custom404';
import usePageTracker from 'hooks/usePageTracker';
import DataView from 'views/DataView';
import CheckIn from 'views/CheckIn';

const AppRouter = () => {
  usePageTracker();
  updateIntercom(undefined, { hide_default_launcher: false });

  return (
    <Switch>
      <ProtectedRoute exact path="/" component={DashboardView} />
      <PublicRoute path="/signin" authRedirectTo="/" component={SignInView} />

      {/* TODO: Comes back for beta participants */}
      {/* <PublicRoute path="/register/:token" authRedirectTo="/dashboard" component={RegisterView} /> */}
      {/* <PublicRoute path="/register" authRedirectTo="/dashboard" component={RegisterView} /> */}
      <ProtectedRoute path="/check-in" component={CheckIn} />
      <ProtectedRoute
        path="/dashboard"
        authRedirectTo="/"
        component={DashboardView}
      />
      <ProtectedRoute path="/daily-diary" component={DailyDiary} />
      <ProtectedRoute path="/data" component={DataView} />
      <ProtectedRoute path="/settings" component={AccountSettings} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRouter;
