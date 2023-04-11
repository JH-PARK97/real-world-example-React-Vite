import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

export const API_KEY = import.meta.env.VITE_APP_API_KEY;

axios.defaults.baseURL = "https://api.realworld.io/api/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
