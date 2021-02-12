// import { combineReducers } from 'redux';

const INITIAL_STATE = {
  authenticated: false,
  api_key: null,
  account_id: null,
  live: false
}

const Auth = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case "LOGIN":
      state.authenticated = true;
      state.api_key = action.payload.api_key;
      state.account_id = action.payload.account_id;
      state.live = action.payload.live;
      console.log("LOGIN", state);
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