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
      });
      return action.user;
    case 'USER_LOGOUT':
      shutdownIntercom();
      return {};
    case 'USER_UPDATE':
      return { ...state, ...action.user };
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

export {
  UserProvider,
  useUserState,
  useUserDispatch,
};
