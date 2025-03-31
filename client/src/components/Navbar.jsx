import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { userLoginContext } from "../contexts/userLoginContext";
import NotificationBell from "./notifications/NotificationBell"; 
import "./Navbar.css";

function Navbar() {
  const { logoutUser, userLoginStatus } = useContext(userLoginContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
      {/* Logo */}
      <Link to="/">
        <div className="logo d-flex">
          <img src="/logo.png" alt="Carely Logo" />
        </div>
      </Link>

      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Links */}
      <ul className={`nav d-flex ${menuOpen ? "active" : ""}`}>
        <li className="nav-item">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="explore" onClick={() => setMenuOpen(false)}>Explore</Link>
        </li>
        <li className="nav-item">
          <Link to="medibot" onClick={() => setMenuOpen(false)}>Assist</Link>
        </li>
        <li className="nav-item">
          <Link to="mediNotify" onClick={() => setMenuOpen(false)}>MediNotify</Link>
        </li>

        {/* Conditional Login/Logout */}
        {userLoginStatus ? (
          <li className="nav-item">
            <Link to="auth" onClick={() => { logoutUser(); setMenuOpen(false); }}>
              Logout
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="auth" onClick={() => setMenuOpen(false)}>Login/Register</Link>
          </li>
        )}
      </ul>

      {/* Notification Bell */}
      <div className="nav-item">
        <NotificationBell />
      </div>
    </div>
  );
}

export default Navbar;
