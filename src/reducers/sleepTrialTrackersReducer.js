const sleepTrialTrackersReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE':
      return action.sleepTrialTrackers;
    case 'ADD':
      return [
        ...state,
        action.sleepTrialTracker,
      ];
    case 'UPDATE':
      return state.map((trialTracker) => {
        if (trialTracker._id === action.sleepTrialTracker._id) {
          return action.sleepTrialTracker;
        }
        return trialTracker;
      });
    case 'REMOVE':
      return state.filter((trialTracker) => trialTracker._id !== action._id);
    default:
      return state;
  }
}

export default sleepTrialTrackersReducer;
