import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatbotUI.css";

const ChatbotUI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English"); // Default language
  const messagesEndRef = useRef(null);

  // Send text message to the backend
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://carely-health-7zfg.onrender.com/chat?message=${encodeURIComponent(input)}&language=${encodeURIComponent(language)}`
      );
      const botMsg = { sender: "bot", structured: response.data };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error fetching response. Please try again later." },
      ]);
    }

    setLoading(false);
  };

  // Handle voice input using Web Speech API
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === "Hindi" ? "hi-IN" : language === "Telugu" ? "te-IN" : "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderBotMessage = (msg) => {
    if (msg.structured) {
      return (
        <div>
          <div className="response-section">
            <h3>Possible Conditions:</h3>
            <ul>
              {msg.structured.possibleConditions?.map((cond, idx) => (
                <li key={idx}>{cond}</li>
              ))}
            </ul>
          </div>
          <div className="response-section">
            <h3>Early Signs:</h3>
            <p>{msg.structured.earlySigns}</p>
          </div>
          <div className="response-section">
            <h3>Causes:</h3>
            <p>{msg.structured.causes}</p>
          </div>
          <div className="response-section">
            <h3>Remedies:</h3>
            <ul>
              {msg.structured.remedies?.map((rem, idx) => (
                <li key={idx}>{rem}</li>
              ))}
            </ul>
          </div>
          <div className="response-section">
            <h3>Yoga Tips:</h3>
            <p>{msg.structured.yogaTips}</p>
          </div>
          <div className="response-section">
            <h3>Precautions:</h3>
            <p>{msg.structured.precautions}</p>
          </div>
        </div>
      );
    } else {
      return <div>{msg.text}</div>;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">MediBot Chat</div>
      <div className="language-select">
        <label htmlFor="language">Select Language: </label>
        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
        </select>
        <button className="voice-button" onClick={handleVoiceInput}>🎤 Voice</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="bubble">{msg.sender === "bot" ? renderBotMessage(msg) : msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Describe your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>{loading ? "Typing..." : "Send"}</button>
      </div>
    </div>
  );
};

export default ChatbotUI;
