import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { updateIntercom } from 'next-intercom';
import ProtectedRoute from 'routes/ProtectedRoute';
import PublicRoute from 'routes/PublicRoute';
import SignInView from 'views/SignInView';
import RegisterView from 'views/RegisterView';
import DashboardView from 'views/DashboardView';
import AccountSettings from 'views/AccountSettings';
import DailyDiary from 'views/DailyDiary';
import NotFound from 'views/Custom404';
import usePageTracker from 'hooks/usePageTracker';
import DataView from 'views/DataView';
import CheckIn from 'views/CheckIn';
import Plans from 'views/Plans';
import PlansSuccess from 'views/PlansSuccess';
import Renew from 'views/Renew';

const AppRouter = () => {
  usePageTracker();
  // updateIntercom(undefined, { hide_default_launcher: false });

  return (
    <Switch>
      <ProtectedRoute exact path="/" isProvisioned component={DashboardView} />
      <PublicRoute path="/signin" authRedirectTo="/" component={SignInView} />
      <ProtectedRoute path="/renew" component={Renew} />
      <ProtectedRoute
        path="/plans/success/:sessionId"
        component={PlansSuccess}
      />
      <ProtectedRoute path="/plans" component={Plans} />
      <PublicRoute
        path="/register/:token"
        authRedirectTo="/dashboard"
        component={RegisterView}
      />
      <PublicRoute
        path="/register"
        authRedirectTo="/dashboard"
        component={RegisterView}
      />
      <ProtectedRoute path="/check-in" isProvisioned component={CheckIn} />
      <ProtectedRoute
        path="/dashboard"
        isProvisioned
        authRedirectTo="/"
        component={DashboardView}
      />
      <ProtectedRoute
        path="/daily-diary"
        isProvisioned
        component={DailyDiary}
      />
      <ProtectedRoute path="/data" isProvisioned component={DataView} />
      <ProtectedRoute path="/settings" component={AccountSettings} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRouter;
