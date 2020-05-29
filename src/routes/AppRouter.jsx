import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';
import PublicRoute from 'routes/PublicRoute';
import SignInView from 'views/signInView/SignInView';
import SignUpView from 'views/signUpView/SignUpView';
import DashboardView from 'views/dashboard/DashboardView';
import AccountSettings from 'views/accountSettings/AccountSettings';
import CheckInsView from 'views/checkins/CheckInsView';
import SleepTrialReportView from 'views/sleepTrialReport/SleepTrialReportView';
import NotFound from 'views/notFound/NotFound';

const AppRouter = () => (
  <div>
    <Switch>
      <ProtectedRoute exact path="/" component={DashboardView} />
      <PublicRoute path="/login" component={SignInView} />
      <PublicRoute path="/signup" component={SignUpView} />
      <ProtectedRoute path="/dashboard" component={DashboardView} />
      <ProtectedRoute path="/daily-diary" component={CheckInsView} />
      <ProtectedRoute path="/sleep-trial-report/:id" component={SleepTrialReportView} />
      <ProtectedRoute path="/settings" component={AccountSettings} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default AppRouter;
