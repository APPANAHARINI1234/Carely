import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import EditProfile from "./components/EditProfile"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Home from "./components/Home"; // Import Dashboard
import AddNotification from "./components/AddNotification";
import Notifications from "./components/Notifications";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-notification" element={<AddNotification />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
};

export default App;
