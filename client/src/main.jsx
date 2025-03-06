import React from "react";
import ReactDOM from "react-dom/client"; // Ensure this import is correct
import App from "./App";
import { UserProvider } from "./components/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
