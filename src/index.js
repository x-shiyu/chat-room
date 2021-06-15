import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "@@/ErrorBoundry";
window.global = {};
ReactDOM.render(
  <ErrorBoundary>
    <Suspense fallback={<div>...Loading...</div>}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Suspense>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
