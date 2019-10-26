import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";

const store = configureStore();

const WrappedApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(WrappedApp, document.getElementById("root"));

serviceWorker.unregister();
