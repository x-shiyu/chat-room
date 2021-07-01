import React, { createContext, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "@@/ErrorBoundry";
import { UseRequestProvider } from "ahooks";
import { Emitter } from "@/utils";
export const EmitterContext = createContext(new Emitter());
ReactDOM.render(
  <ErrorBoundary>
    <EmitterContext.Provider>
      <UseRequestProvider value={{ manual: true }}>
        <Suspense fallback={<div>...Loading...</div>}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </Suspense>
      </UseRequestProvider>
    </EmitterContext.Provider>
  </ErrorBoundary>,

  document.getElementById("root")
);

// reportWebVitals();
