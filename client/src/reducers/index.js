// import { combineReducers } from 'redux';

const INITIAL_STATE = {
  authenticated: false,
  api_key: null,
  account_id: null
}

const Auth = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case "LOGIN":
      state.authenticated = true;
      state.api_key = action.payload.api_key;
      state.api_key = action.payload.account_id;
      break;
      case "LOGOUT":
        state = INITIAL_STATE
        break;
      case "INCREMENT":
        state.counter++;
        break;
  default:
      break;
  }
  
  return Object.assign({}, state);
}

export default Auth;