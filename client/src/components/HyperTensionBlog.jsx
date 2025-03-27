import React from "react";
import "./Blog.css"; // Assuming you have a common CSS file for styling

const HypertensionBlog = () => {
  return (
    <div className="blog-container">
      <h1>Hypertension (High Blood Pressure)</h1>
      <img src="/images/hypertension.png" alt="Hypertension" className="blog-image" />

      <p>
        Hypertension, also known as high blood pressure, is a condition where the force of the blood against the artery walls is consistently too high. Over time, this can lead to serious health complications, including heart disease, stroke, and kidney failure.
      </p>

      <h2>Causes</h2>
      <ul>
        <li>Genetic predisposition</li>
        <li>Unhealthy diet (high in salt, fat, and cholesterol)</li>
        <li>Lack of physical activity</li>
        <li>Obesity and overweight</li>
        <li>Smoking and excessive alcohol consumption</li>
        <li>Chronic stress</li>
      </ul>

      <h2>Symptoms</h2>
      <p>
        Hypertension is often called the "silent killer" because it may not show noticeable symptoms until complications arise. However, some people may experience:
      </p>
      <ul>
        <li>Severe headaches</li>
        <li>Shortness of breath</li>
        <li>Nosebleeds</li>
        <li>Dizziness or blurred vision</li>
        <li>Chest pain</li>
      </ul>

      <h2>Prevention & Treatment</h2>
      <ul>
        <li>Maintain a balanced diet rich in fruits, vegetables, and whole grains</li>
        <li>Reduce salt intake</li>
        <li>Engage in regular physical activity</li>
        <li>Manage stress through yoga, meditation, or relaxation techniques</li>
        <li>Limit alcohol and avoid smoking</li>
        <li>Regularly monitor blood pressure and take prescribed medications if necessary</li>
      </ul>

      <h2>When to See a Doctor?</h2>
      <p>
        If your blood pressure readings are consistently high (above 140/90 mmHg), consult a doctor immediately for proper diagnosis and treatment.
      </p>
    </div>
  );
};

export default HypertensionBlog;
