import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import UserLoginStore from "./contexts/UserLoginStore.jsx";
import { UserProvider } from "./components/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <UserLoginStore>
      <UserProvider>
        <App />
      </UserProvider>
    </UserLoginStore>
  </StrictMode>
);
