import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// UI frameworks först
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Egna stilar efteråt (override Bootstrap)
import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
