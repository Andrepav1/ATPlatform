import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import configureStore from "./store";

import { Auth0Provider } from "@auth0/auth0-react";

const { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-j6nxrys8.us.auth0.com"
      clientId="agfVxynPYlHQSZmXrwzqh7fOE9ijC0LX"
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
