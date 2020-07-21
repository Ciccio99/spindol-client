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
      return state;
  }
};

export default alertSystemReducer;
