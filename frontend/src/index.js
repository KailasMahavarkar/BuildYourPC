import React from "react";
import ReactDOM from "react-dom";

import App from "./js/App";
import { CookiesProvider } from "react-cookie";

// scss
import "./scss/main.scss";
import './scss/index/_index.scss'

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
