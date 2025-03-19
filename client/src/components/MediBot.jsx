import React from "react";
import ChatbotUI from "./ChatbotUI";
import { Link } from "react-router-dom";
import "./MediBot.css"; // Ensure this file exists for styling

const MediBot = () => {
  return (
    <div className="medibot-container">
      <h1 className="medibot-title">MediBot - Your Health Assistant 🤖</h1>
      <p className="medibot-description">
        Get personalized health insights and remedies with MediBot.
      </p>
      
      <div className="chatbot-section">
        <ChatbotUI />
      </div>

      {/* Attractive Button */}
      <Link to="/home" className="medibot-button">
        🔙 Back to Home
      </Link>
    </div>
  );
};

export default MediBot;
