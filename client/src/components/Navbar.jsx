// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>Carely</div>
      <div className="nav-links">
        <a onClick={() => navigate("/services")}>Services</a>
        <a onClick={() => navigate("/about")}>About</a>
        <a onClick={() => navigate("/contact")}>Contact</a>
      </div>
      <div className="auth-section">
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;