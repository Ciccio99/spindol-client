import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUserState, useUserDispatch } from 'context/userContext';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import UserServices from 'services/UserServices';

export default function LogoutWrapper({ children }) {
  const user = useUserState();
  const dispatchUser = useUserDispatch();
  const dispatchAlert = useAlertSystemDispatch();
  const history = useHistory();

  const handleClick = () => {
    if (!user._id) {
      dispatchAlert({
        type: 'WARNING',
        message: "You're not logged in.",
      });
      return;
    }
    (async () => {
      try {
        await UserServices.logout();
      } catch (error) {
        dispatchAlert({
          type: 'ERROR',
          message: error.response?.data?.message || 'Something went wrong...',
        });
      } finally {
        dispatchUser({
          type: 'USER_LOGOUT',
        });
        history.push('/signin');
      }
    })();
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { onClick: handleClick })
  );
}
