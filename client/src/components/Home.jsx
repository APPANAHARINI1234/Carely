import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles.css";
import logo from "../assets/logo.png"

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="main">
        <h1 className="main-title">Welcome to Carely</h1>
        <p className="main-description">
          Your trusted health companion, offering personalized care and wellness insights.
        </p>
        <img src={logo} alt="logo" width="50px" />
       
        <button className="main-button">Get Started</button>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
