import React from 'react';

const AlertSystemStateContext = React.createContext();
const AlertSystemDispatchContext = React.createContext();

const alertSystemReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        open: true,
        message: action.message,
        severity: 'success',
      };
    case 'INFO':
      return {
        open: true,
        message: action.message,
        severity: 'info',
      };
    case 'WARNING':
      return {
        open: true,
        message: action.message,
        severity: 'warning',
      };
    case 'ERROR':
      return {
        open: true,
        message: action.message,
        severity: 'error',
      };
    case 'CLOSE': {
      return {
        open: false,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AlertSystemProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(alertSystemReducer, { open: false });
  return (
    <AlertSystemStateContext.Provider value={state}>
      <AlertSystemDispatchContext.Provider value={dispatch}>
        {children}
      </AlertSystemDispatchContext.Provider>
    </AlertSystemStateContext.Provider>
  );
};

const useAlertSystemState = () => {
  const context = React.useContext(AlertSystemStateContext);
  if (context === undefined) {
    throw new Error('useAlertSystemState must be used within a AlertSystemProvider');
  }
  return context;
};

const useAlertSystemDispatch = () => {
  const context = React.useContext(AlertSystemDispatchContext);
  if (context === undefined) {
    throw new Error('useAlertSystemDispatch must be used within a AlertSystemProvider');
  }
  return context;
};

export {
  AlertSystemProvider,
  useAlertSystemState,
  useAlertSystemDispatch,
};
