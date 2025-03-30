import React, { useState, useEffect } from "react";
import "./Home.css"; // Import styles

const funFacts = [
  "The human brain produces enough electricity to power a small light bulb.",
  "Yoga is over 5,000 years old and originated in India.",
  "Dark chocolate can improve brain function and heart health.",
  "Walking just 30 minutes a day can improve cardiovascular health.",
  "Listening to music can lower stress and improve focus.",
  "A sneeze can travel up to 100 miles per hour.",
  "Deep breathing in yoga increases lung capacity and oxygen levels.",
  "Laughter boosts the immune system and reduces stress hormones.",
  "The average person’s skin completely replaces itself every 27 days.",
  "Drinking green tea can enhance metabolism and improve brain function.",
  "Honey never spoils and has been found in ancient Egyptian tombs.",
  "Bananas can help improve mood due to their high levels of tryptophan.",
  "Your bones are about five times stronger than steel of the same density.",
  "The heart beats around 100,000 times a day, pumping about 2,000 gallons of blood.",
  "Smiling can actually trick your brain into feeling happier.",
  "Regular meditation can increase grey matter in the brain, improving memory and learning.",
  "Your liver can regenerate itself even if 75% of it is removed.",
  "Cold showers can boost circulation and improve immune response.",
  "Chewing gum can improve concentration and memory.",
];

const getRandomFact = () => {
  const todayIndex = new Date().getDate() % funFacts.length;
  return funFacts[todayIndex];
};

const FunFact = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    setFact(getRandomFact());
  }, []);

  return (
    <div className="fun-fact-section">
      <h2>✨ Fun Fact ✨</h2>
      <p className="fun-fact-text">{fact}</p>
    </div>
  );
};

const ImageCarousel = () => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT59OKgT1M_hNE3NVbi2swvAYNaF8-2QhSfdQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ4WaNx2wKdWnafytgLPpRdFtpQgqHhZ-bpA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuQfRvzjiFn_8EBDitwz2EiZWkrcJDNihQ_g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRb-yjgKIX3x2nV4MqXxpbjnVvZHy410KJoA&s",
  ];

  return (
    <div className="carousel">
      <div className="image-track">
        {images.concat(images).map((src, index) => (
          <img key={index} src={src} alt={`Health Image ${index}`} className="image" />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ title, features }) => {
  return (
    <div className="feature-card">
      <h2>{title}</h2>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 Carely. All rights reserved.</p>
      <nav>
        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Contact Us</a>
      </nav>
    </footer>
  );
};

const Home1 = () => {
  return (
    <div className="home-container">
      <FunFact />
      <h1>Welcome to Carely</h1>
      <p>Your trusted health companion, offering personalized care and wellness insights.</p>
      
      <ImageCarousel />

      <div className="Symptomate">
        <h1>About Symptomate</h1>
        <p>
          Symptomate is an intelligent tool for symptom assessment, made for you. Each time you add extra symptoms, the 
          interview adjusts itself to you. This is made possible through our cutting-edge, AI-based inference engine and 
          meticulously maintained medical knowledge base.
        </p>
        <h1>Who is this for?</h1>
      </div>

      <div className="feature-grid">
        <FeatureCard 
          title="Individuals" 
          features={[
            "5 levels of care recommendations",
            "Simple language and common names",
            "Educational articles"
          ]}
        />
        <FeatureCard 
          title="Parents" 
          features={[
            "Pediatrics conditions",
            "Symptom pair analysis",
            "Body maps of children in different age groups"
          ]}
        />
        <FeatureCard 
          title="Family members" 
          features={[
            "Third-person mode",
            "Instructions and explanations"
          ]}
        />
      </div>

      <div className="info-section">
        <div className="info-image">
          <img
            src="https://symptomchecker.isabelhealthcare.com/assets/pre/home_2a-5f774e5b21633bfd561c26e94a877b6ecd7c0e0177dfd65f9f407d4e4607959d.jpg"
            alt="Doctor with tablet"
          />
        </div>
        <div className="info-text">
          <h2>Why should you use Carely?</h2>
          <ol>
            <li>Our symptom checker is quick and easy to use - enter as many symptoms as you like without endless questions.</li>
            <li>Use the one doctors trust. Carely's professional tool has been used in leading hospitals worldwide since 2001.</li>
            <li>The Carely Symptom Checker is recognized worldwide for its accuracy, covering both common and rare conditions.</li>
          </ol>
        </div>
      </div>

      <div className="medicine-reminder">
        <h2>💊⏰ Medicine Reminder App</h2>
        <p>
          Staying on top of your medications is now easier than ever! Our Medicine Reminder App helps you set reminders
          for your daily prescriptions, ensuring you never miss a dose.
        </p>
        <ul>
          <li>* Easy-to-Use Interface – Add medicine name, dosage, and reminder time.</li>
          <li>* Smart Notifications – Get timely alerts so you never forget your medication.</li>
          <li>* Customizable Reminders – Set multiple reminders based on your schedule.</li>
          <li>* User-Friendly Design – Simple and intuitive layout for all age groups.</li>
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default Home1;
