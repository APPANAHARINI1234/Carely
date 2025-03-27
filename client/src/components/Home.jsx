import React, { useState, useEffect } from "react";


import Footer from "./Footer";
import "./Home.css";
import logo from "../assets/logo.png";


const Home = () => {
  
  return (
    <div className="home-container">
     
      <header className="hero-section">
        {/* <img src={logo} alt="Hero" className="hero-image" /> */}
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
      <p>Chat with MediBot for personalized health insights and remedies.</p>
<button className="medibot-btn" onClick={() => navigate("/medibot")}>
  Talk to MediBot
</button>
      <Footer />
    </div>
  );
};
export default Home;



