import React from 'react';
import { updateIntercom, shutdownIntercom } from 'next-intercom';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      updateIntercom(undefined, {
        name: action.user.name,
        email: action.user.email,
        user_id: action.user._id,
        subscription_id: action.user.stripe?.subscription?.id,
        subscription_type: action.user.stripe?.subscription?.type,
        subscription_status: action.user.stripe?.subscription?.status,
      });
      return action.user;
    case 'USER_LOGOUT':
      shutdownIntercom();
      return {};
    case 'USER_UPDATE': {
      const updatedUser = { ...state, ...action.user };
      updateIntercom(undefined, {
        name: updatedUser.name,
        email: updatedUser.email,
        user_id: updatedUser._id,
        subscription_id: updatedUser.stripe?.subscription?.id,
        subscription_type: updatedUser.stripe?.subscription?.type,
        subscription_status: updatedUser.stripe?.subscription?.status,
      });
      return updatedUser;
    }
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, {});
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

const useUserState = () => {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

const useUserDispatch = () => {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUserState, useUserDispatch };
