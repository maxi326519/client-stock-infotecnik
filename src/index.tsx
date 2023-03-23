import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import reportWebVitals from "./reportWebVitals";
import store from './redux/store';
import axios from "axios";

import App from "./App";

import "./index.css";

const isProdApp = process.env.REACT_APP_PRODUCTION;
const devApi = process.env.REACT_APP_API_URL_DEV;
const prodApi = process.env.REACT_APP_API_URL_PROD;

console.log(isProdApp);
console.log(prodApi);
console.log(devApi);
console.log(isProdApp === "true" ? prodApi : devApi);

axios.defaults.baseURL = isProdApp === "true" ? prodApi : devApi;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
