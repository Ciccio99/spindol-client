const userReducer = (state, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return action.user ;
    case 'USER_LOGOUT':
      return {};
    case 'USER_UPDATE':
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
