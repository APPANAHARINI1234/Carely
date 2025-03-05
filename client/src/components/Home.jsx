import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import logo from "../assets/logo.png";


const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <Navbar user={user} handleLogout={handleLogout} />
      <header className="hero-section">
        <img src={logo} alt="Hero" className="hero-image" />
        <div className="hero-overlay">
          <h1>Welcome to <span>Carely</span></h1>
          <p>Your trusted health companion, offering personalized care and wellness insights.</p>
          <button className="cta-btn" onClick={() => navigate("/explore")}>Explore More</button>
        </div>
      </header>
      <section className="features">
        <div className="feature-card">🏥 Find Nearby Hospitals</div>
        <div className="feature-card">📅 Track Appointments</div>
        <div className="feature-card">🩺 Health Insights</div>
        <div className="feature-card">💊 Medicine Reminders</div>
      </section>
      <Footer />
    </div>
  );
};
export default Home;
