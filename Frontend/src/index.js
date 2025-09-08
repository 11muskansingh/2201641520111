import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Logger } from "../../Logging_Middleware/src";

const logger = new Logger({
  service: "url-shortener-frontend",
  level: "info",
});

logger.info("Starting URL Shortener Frontend Application");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
