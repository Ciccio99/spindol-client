import React from 'react';
import moment from 'moment-timezone';

const SessionProgressContext = React.createContext();
const SessionProgressDispatchContext = React.createContext();

const sessionProgressReducer = (state, action) => {
  if (action.type === 'INIT') {
    const { lastUpdate } = action.value;
    const diff = lastUpdate ? moment().diff(moment(moment.utc(lastUpdate).format('YYYY-MM-DD')), 'day') : -1;
    const initState = { ...state, stats: { ...action.value }, signIn: true, initialized: true, completed: (diff === 0) };
    if (initState.completed) {
      initState.signIn = true;
      initState.mood = true;
      initState.tags = true;
    }
    return initState;
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
    case 'UPDATE_STATS':
      return { ...state, stats: action.value };
    case 'UPDATING': {
      return { ...state, updating: true };
    }
    case 'DONE_UPDATING': {
      return { ...state, updating: false };
    }
    case 'SESSION_COMPLETE': {
      return { ...state, completed: true };
    }
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
