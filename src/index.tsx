import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//add multiple pages for a single app on top level: wrapper
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
