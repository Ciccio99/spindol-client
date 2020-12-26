import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';
import PublicRoute from 'routes/PublicRoute';
import SignInView from 'views/signInView/SignInView';
// import RegisterView from 'views/registerView/RegisterView';
import DashboardView from 'views/dashboard/DashboardView';
import AccountSettings from 'views/accountSettings/AccountSettings';
import CheckInsView from 'views/checkins/CheckInsView';
import SleepTrialReportView from 'views/sleepTrialReport/SleepTrialReportView';
import NotFound from 'views/notFound/NotFound';
import TermsOfService from 'views/legal/TermsOfService';
import PrivacyPolicy from 'views/legal/PrivacyPolicy';
import Home from 'views/home/Home';
import usePageTracker from 'hooks/usePageTracker';
import DataView from 'views/DataView';

const AppRouter = () => {
  usePageTracker();

  return (
    <div>
      <Switch>
        <PublicRoute exact path="/" component={Home} />
        <PublicRoute path="/signin" authRedirectTo="/dashboard" component={SignInView} />
        {/* <PublicRoute path="/register/:token" authRedirectTo="/dashboard" component={RegisterView} /> */}
        {/* <PublicRoute path="/register" authRedirectTo="/dashboard" component={RegisterView} /> */}
        <PublicRoute path="/terms-of-service" component={TermsOfService} />
        <PublicRoute path="/privacy-policy" component={PrivacyPolicy} />
        <ProtectedRoute path="/dashboard" component={DashboardView} />
        <ProtectedRoute path="/daily-diary" component={CheckInsView} />
        <ProtectedRoute path="/data" component={DataView} />
        <ProtectedRoute path="/sleep-trial-report/:id" component={SleepTrialReportView} />
        <ProtectedRoute path="/settings" component={AccountSettings} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default AppRouter;
