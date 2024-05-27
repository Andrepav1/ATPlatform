import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import configureStore from "./store";

const { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
    <Provider store={store}>
      // @ts-expect-error TS(2786): 'PersistGate' cannot be used as a JSX component.
      <PersistGate loading={null} persistor={persistor}>
        // @ts-expect-error TS(2769): No overload matches this call.
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
reportWebVitals();
