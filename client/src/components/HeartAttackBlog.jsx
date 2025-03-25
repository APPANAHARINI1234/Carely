import React from "react";
import "./Blog.css";

const HeartAttackBlog = () => {
  return (
    <div className="blog-container">
      <h1>Understanding Heart Attacks</h1>
      <p>
        A heart attack occurs when blood flow to the heart is blocked, 
        leading to damage in the heart muscle.
      </p>

      <h2>Symptoms</h2>
      <ul>
        <li>Chest pain or discomfort</li>
        <li>Shortness of breath</li>
        <li>Nausea and dizziness</li>
      </ul>

      <h2>Preventive Measures</h2>
      <p>
        Regular exercise, a balanced diet, and avoiding smoking can 
        significantly reduce the risk of heart attacks.
      </p>
    </div>
  );
};

export default HeartAttackBlog;
