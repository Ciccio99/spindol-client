import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserState } from 'context/userContext';
import { isSubscriptionActive } from 'utils/subscription-utils';
import ROUTES from 'constants/routes';

// TODO: Reroute to sign in if server side login tokens removed and unable to auth

const ProtectedRoute = ({
  authRedirectTo,
  isProvisioned = false,
  ...props
}) => {
  const user = useUserState();
  const isAuthenticated = !!user._id;

  if (isAuthenticated) {
    if (isProvisioned && !isSubscriptionActive(user)) {
      return <Redirect to={ROUTES.renew} />;
    }
    if (authRedirectTo) {
      return <Redirect to={authRedirectTo} />;
    }
    return <Route {...props} />;
  }

  return <Redirect to="/signin" />;
};

export default ProtectedRoute;
