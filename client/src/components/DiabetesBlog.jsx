import React from "react";
import "./Disease.css";

const DiabetesBlog = () => {
  return (
    <div className="disease-container">
      <h1>Diabetes</h1>
      <p>Diabetes is a metabolic disease that results in high blood sugar levels...</p>

      <h3>Symptoms:</h3>
      <ul>
        <li>Increased thirst</li>
        <li>Frequent urination</li>
        <li>Fatigue</li>
      </ul>

      <h3>Remedies:</h3>
      <ul>
        <li>Insulin therapy</li>
        <li>Low-carb diet</li>
        <li>Regular exercise</li>
      </ul>
    </div>
  );
};

export default DiabetesBlog;
