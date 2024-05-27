// import { combineReducers } from 'redux';

const INITIAL_STATE = {
  authenticated: false,
  api_key: null,
  account_id: null,
  live: false,
};

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
      state = INITIAL_STATE;
      break;
    case "INCREMENT":
      // @ts-expect-error TS(2339): Property 'counter' does not exist on type '{ authe... Remove this comment to see the full error message
      state.counter++;
      break;
    default:
      break;
  }

  return Object.assign({}, state);
};

export default Auth;
