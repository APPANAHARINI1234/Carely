import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import "./Explore.css";

const diseases = [
  { id: 1, name: "PCOD", category: "Metabolic", image: "/images/pcod.jpeg", description: "A hormonal disorder causing enlarged ovaries with small cysts.", path: "/pcod" },
  { id: 2, name: "PCOS", category: "Metabolic", image: "/images/pcos.png", description: "A hormonal disorder affecting the ovaries.", path: "/pcos" },
  { id: 3, name: "Diabetes", category: "Metabolic", image: "/images/diabetes.png", description: "A metabolic disorder leading to high blood sugar.", path: "/diabetes" },
  { id: 4, name: "Heart Attack", category: "Cardiovascular", image: "/images/heartattack.png", description: "A blockage of blood flow to the heart.", path: "/heartattack" },
  { id: 5, name: "Hypertension", category: "Cardiovascular", image: "/images/hypertension.png", description: "A condition where blood pressure stays high.", path: "/hypertension" },
  { id: 6, name: "Brain Cancer", category: "Oncology", image: "/images/braincancer.png", description: "Uncontrolled growth of cells in the brain.", path: "/braincancer" },
  { id: 7, name: "Kidney Disease", category: "Renal", image: "/images/kidney.png", description: "Damage to kidneys reducing their function.", path: "/kidneydisease" },
  { id: 8, name: "COPD", category: "Respiratory", image: "/images/copd.png", description: "A chronic lung disease causing breathing difficulty.", path: "/copd" },
  { id: 9, name: "Thyroid Disease", category: "Endocrine", image: "/images/thyroid.png", description: "Disorder affecting thyroid gland function.", path: "/thyroid" },
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [darkMode, setDarkMode] = useState(false);
  const [featuredDisease, setFeaturedDisease] = useState(null);
  let chartInstance = null;

  // Randomly select a featured disease on page load
  useEffect(() => {
    setFeaturedDisease(diseases[Math.floor(Math.random() * diseases.length)]);
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("diseaseChart");
    if (ctx) {
      if (chartInstance) {
        chartInstance.destroy(); // Prevent duplicate charts
      }
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Cardiovascular", "Metabolic", "Oncology", "Renal", "Respiratory", "Endocrine"],
          datasets: [{
            label: "Cases (millions)",
            data: [25, 40, 15, 10, 18, 12],
            backgroundColor: "#166534",
          }],
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  const filteredDiseases = diseases
    .filter((disease) =>
      disease.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((disease) =>
      selectedCategory === "All" || disease.category === selectedCategory
    )
    .sort((a, b) => (sortOrder === "A-Z" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  return (
    <div className={`explore-container ${darkMode ? "dark-mode" : ""}`}>
      <h2 className="explore-header">Explore Diseases</h2>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <input type="text" className="search-bar" placeholder="Search diseases..." onChange={(e) => setSearchTerm(e.target.value)} />
      
      <div className="filter-section">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option>All</option>
          <option>Cardiovascular</option>
          <option>Metabolic</option>
          <option>Oncology</option>
          <option>Renal</option>
          <option>Respiratory</option>
          <option>Endocrine</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

      {featuredDisease && (
        <div className="featured-disease">
          <h3>Featured Disease: {featuredDisease.name}</h3>
          <p>{featuredDisease.description}</p>
        </div>
      )}

      <div className="disease-grid">
        {filteredDiseases.map((disease) => (
          <div key={disease.id} className="disease-card">
            <img className="disease-image" src={disease.image} alt={disease.name} />
            <div className="disease-info">
              <h3>{disease.name}</h3>
              <p>{disease.description}</p>
              <Link to={disease.path} className="read-more">Read More</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="feedback-section">
        <p>Did you find this information helpful?</p>
        <button className="feedback-btn">Yes</button>
        <button className="feedback-btn">No</button>
      </div>

      {/* Graph moved to the bottom */}
      <div className="chart-container">
        <h3>Disease Cases Distribution</h3>
        <canvas id="diseaseChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default Explore;
