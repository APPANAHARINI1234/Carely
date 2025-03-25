import React from "react";
import "./Blog.css";

const PCODBlog = () => {
  return (
    <div className="blog-container">
      <h1>Understanding PCOD</h1>
      <p>
        Polycystic Ovarian Disease (<span className="highlight">PCOD</span>) is a common hormonal disorder affecting millions of women worldwide.
        It occurs when the ovaries produce excessive immature eggs, leading to hormonal imbalance and various health complications.
      </p>

      <h2>Causes of PCOD</h2>
      <ul>
        <li>Hormonal imbalances, especially excess androgens (male hormones)</li>
        <li>Insulin resistance leading to high blood sugar levels</li>
        <li>Genetic predisposition (family history of PCOD or diabetes)</li>
        <li>Unhealthy diet and sedentary lifestyle</li>
        <li>Chronic stress and irregular sleep patterns</li>
      </ul>

      <h2>Common Symptoms</h2>
      <ul>
        <li>Irregular or missed periods</li>
        <li>Unwanted facial and body hair growth (hirsutism)</li>
        <li>Weight gain, especially around the abdomen</li>
        <li>Acne, oily skin, and hair thinning</li>
        <li>Mood swings, depression, and anxiety</li>
        <li>Difficulty in conceiving (infertility)</li>
      </ul>

      <h2>Natural Remedies & Lifestyle Changes</h2>
      <p>
        Managing PCOD requires a holistic approach, focusing on diet, exercise, and stress reduction. Some natural ways to manage symptoms include:
      </p>
      
      <div className="tip-box">
        <h3>1. Dietary Modifications</h3>
        <ul>
          <li>Eat a balanced diet rich in fiber, proteins, and healthy fats</li>
          <li>Reduce sugar and processed foods to control insulin resistance</li>
          <li>Include anti-inflammatory foods like turmeric, flaxseeds, and green leafy vegetables</li>
        </ul>
      </div>

      <div className="tip-box">
        <h3>2. Exercise & Physical Activity</h3>
        <ul>
          <li>Engage in regular physical activities like yoga, brisk walking, and strength training</li>
          <li>Yoga poses like Surya Namaskar, Bhujangasana, and Pranayama help balance hormones</li>
          <li>Aim for at least 30-45 minutes of exercise daily</li>
        </ul>
      </div>

      <div className="tip-box">
        <h3>3. Stress Management</h3>
        <ul>
          <li>Practice mindfulness, meditation, or deep breathing exercises</li>
          <li>Avoid excessive screen time before bed and maintain a proper sleep schedule</li>
          <li>Engage in hobbies that relax your mind, such as reading or painting</li>
        </ul>
      </div>

      <h2>Ayurvedic & Herbal Remedies</h2>
      <ul>
        <li><b>Shatavari</b> - Balances hormones and improves ovarian function</li>
        <li><b>Ashwagandha</b> - Helps reduce stress and anxiety levels</li>
        <li><b>Cinnamon</b> - Improves insulin sensitivity and regulates periods</li>
        <li><b>Spearmint Tea</b> - Reduces excessive androgen levels and helps control hair growth</li>
      </ul>

      <h2>Medical Treatment Options</h2>
      <p>
        If lifestyle changes alone are not enough, medical intervention may be required:
      </p>
      <ul>
        <li>Oral contraceptives to regulate periods</li>
        <li>Anti-androgen medications to reduce excessive hair growth</li>
        <li>Metformin for managing insulin resistance</li>
        <li>Fertility treatments for women struggling with conception</li>
      </ul>

      <p className="quote">
        "Healing PCOD starts with small lifestyle changes that bring big transformations."
      </p>
    </div>
  );
};

export default PCODBlog;
