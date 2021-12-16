import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./redux/reducers";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";

import Login from "./components/login/Login";
import Layout from "./components/layout/Layout";

const user = () => {
  const userLogin = JSON.parse(localStorage.getItem("profile"));

  return userLogin;
};

const store = createStore(reducers, compose(applyMiddleware(thunk)));

document.title = "SWMS | Smart Waste Management System";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {user() === null ? <Login /> : <Layout />}
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
