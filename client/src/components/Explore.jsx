import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Explore.css";

const DiseaseCard = ({ disease }) => {
  return (
    <div className="disease-card">
      <img className="disease-image" src={disease.image} alt={disease.diseaseName} />
      <div className="disease-info">
        <h3>{disease.diseaseName}</h3>
        <p>{disease.description}</p>
        <Link to={`/disease/${disease._id}`} className="read-more">Read More</Link>
      </div>
    </div>
  );
};

const Explore = () => {
  const [diseases, setDiseases] = useState([]);
  const [featuredDisease, setFeaturedDisease] = useState(null);
  const [healthTip, setHealthTip] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // Sorting state

  useEffect(() => {
    // Fetch all diseases initially
    axios.get("https://carely-health-7zfg.onrender.com/api/explore")
      .then(response => {
        const diseaseData = response.data.data || [];
        setDiseases(diseaseData);
        if (diseaseData.length > 0) {
          setFeaturedDisease(diseaseData[Math.floor(Math.random() * diseaseData.length)]);
        }
      })
      .catch(() => console.error("Error fetching diseases"));

    // Fetch health tips
    axios.get("https://carely-health-7zfg.onrender.com/api/explore/healthTips/random")
      .then(response => setHealthTip(response.data.tip || "Stay healthy!"))
      .catch(() => console.error("Error fetching health tip"));
  }, []);

  // Sort diseases based on sortOrder
  const sortedDiseases = [...diseases].sort((a, b) => {
    if (sortOrder === "a-z") {
      return a.diseaseName.localeCompare(b.diseaseName);
    } else if (sortOrder === "z-a") {
      return b.diseaseName.localeCompare(a.diseaseName);
    }
    return 0; // Default order
  });

  return (
    <div className="explore-container">
      {/* Left Section - Search Bar and Disease Cards */}
      <div className="disease-section">
        {/* Search Bar */}
        <div className="search-sort-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search diseases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Disease Cards */}
        <div className="disease-grid">
          {sortedDiseases.filter(disease =>
            disease.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(disease => (
            <DiseaseCard key={disease._id} disease={disease} />
          ))}
        </div>
      </div>

      {/* Right Sidebar - Featured Disease and Health Tip */}
      <div className="sidebar">
        {featuredDisease && (
          <div className="featured-disease">
            <h3>{featuredDisease.diseaseName}</h3>
            <p>{featuredDisease.description}</p>
            <button className="know-more-button" onClick={() => window.location.href = `/disease/${featuredDisease._id}`}>Know More</button>
          </div>
        )}

        <div className="health-tip-box">
          <h3>Health Tip</h3>
          <p>{healthTip}</p>
        </div>

        {/* Filter Dropdown */}
        <div className="search-sort-container">
          <select
            className="filter-dropdown"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Explore;
