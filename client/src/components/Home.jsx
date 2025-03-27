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

const getRandomItem = (array) => {
  const todayIndex = new Date().getDate() % array.length;
  return array[todayIndex];
};

const FunFact = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    setFact(getRandomItem(funFacts));
  }, []);

  return (
    <div className="fun-fact-section">
      <h2><b>✨ Fun Fact ✨</b></h2>
      <p className="fun-fact-text" style={{ fontWeight: "bold" }}>{fact}</p>
    
    </div>
  );
};

const Home1 = () => {
  return (
    <div className="home-container">
      <FunFact /> {/* Display only the fun fact */}
      <h1>Welcome to Carely</h1>
      <p>Your trusted health companion, offering personalized care and wellness insights.</p>
      <button className="button">Get started</button>
      
      <div className="image-container">
        <img src="https://media.istockphoto.com/id/485210298/vector/symptom-checker-and-medical-services-icon-flat-design.jpg?s=612x612&w=0&k=20&c=1-y-gtXNysNvMcBwwX7pueyYCUBiRuPbLgCrdnOuMlw=" alt="Healthcare" className="image" />
      </div>
      
      <div className="Symptomate">
        <h1>About Symptomate</h1>
        <p>Symptomate is an intelligent tool for symptom assessment, made for you. Each time you add extra symptoms, the interview adjusts itself to you. This is made possible through the combination of our cutting edge, AI-based inference engine and our meticulously maintained medical knowledge base.
        </p>
        <h1>Who is this for?</h1>
      </div>
      
      <div className="container">
        <div className="feature-grid">
          <div className="feature-card">
            <h2>Individuals</h2>
            <ul>
              <li>5 levels of care recommendations</li>
              <li>Simple language and common names</li>
              <li>Educational articles</li>
            </ul>
          </div>
          <div className="feature-card">
            <h2>Parents</h2>
            <ul>
              <li>Pediatrics conditions</li>
              <li>Symptom pair analysis</li>
              <li>Body maps of children in different age groups</li>
            </ul>
          </div>
          <div className="feature-card">
            <h2>Family members</h2>
            <ul>
              <li>Third-person mode</li>
              <li>Instructions and explanations</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex items-center p-8 bg-gray-50 rounded-2xl shadow-lg">
        <div className="w-1/2">
          <img
            src="https://symptomchecker.isabelhealthcare.com/assets/pre/home_2a-5f774e5b21633bfd561c26e94a877b6ecd7c0e0177dfd65f9f407d4e4607959d.jpg"
            alt="Doctor with tablet"
            className="rounded-2xl"
          />
        </div>
        <div className="w-1/2 pl-8">
          <h2 className="text-3xl font-bold mb-4">Why should you use Carely?</h2>
          <ol className="list-decimal list-inside space-y-3 text-lg">
            <li>
              Our symptom checker is quick and easy to use - enter as many symptoms
              as you like without the endless questions.
            </li>
            <li>
              Use the one the doctors use. The Carely professional tool has been
              used in leading hospitals worldwide since 2001.
            </li>
            <li>
              The Carely Symptom Checker is recognised worldwide for its accuracy
              covering both common and rare conditions.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Home1;
