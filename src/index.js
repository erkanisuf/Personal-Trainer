import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Context from "./Context/Context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Context>
    <Router>
      <App />
    </Router>
  </Context>,
  document.getElementById("root")
);

reportWebVitals();
