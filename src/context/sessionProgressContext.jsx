import React from 'react';
import moment from 'moment-timezone';

const SessionProgressContext = React.createContext();
const SessionProgressDispatchContext = React.createContext();

const sessionProgressReducer = (state, action) => {
  console.log('reducer state:', action, state);
  if (action.type === 'INIT') {
    const { lastUpdate } = action.value;
    const diff = lastUpdate ? moment().diff(moment.utc(lastUpdate), 'day') : -1;
    console.log('diff', diff);
    return {
      ...state, stats: { ...action.value }, signIn: true, initialized: true, completed: (diff === 0),
    };
  }
  if (!state.initialized) {
    return state;
  }

  switch (action.type) {
    case 'SIGN_IN_COMPLETE':
      return { ...state, signIn: true };
    case 'MOOD_COMPLETE':
      return { ...state, mood: true };
    case 'TAGS_COMPLETE':
      return { ...state, tags: true };
    case 'SESSION_COMPLETE': {
      return { ...state, completed: true };
    }
    case 'UPDATE':
      console.log('updating', action.value);
      return { ...action.value };
    default:
      return state;
  }
};

const SessionProgressProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(sessionProgressReducer, {
    signIn: false,
    mood: false,
    tags: false,
    stats: {},
    completed: false,
    initialized: false,
  });
  return (
    <SessionProgressContext.Provider value={state}>
      <SessionProgressDispatchContext.Provider value={dispatch}>
        {children}
      </SessionProgressDispatchContext.Provider>
    </SessionProgressContext.Provider>
  );
};

const useSessionProgressState = () => {
  const context = React.useContext(SessionProgressContext);
  if (context === undefined) {
    throw new Error('useSessionProgressState must be used withing a SessionProgressProvider');
  }
  return context;
};

const useSessionProgressDispatch = () => {
  const context = React.useContext(SessionProgressDispatchContext);
  if (context === undefined) {
    throw new Error('useSessionProgressDispatch must be used within a SessionProgressReducer');
  }
  return context;
};

export {
  SessionProgressProvider,
  useSessionProgressState,
  useSessionProgressDispatch,
};
