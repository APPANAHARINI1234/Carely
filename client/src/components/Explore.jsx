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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [featuredDisease, setFeaturedDisease] = useState(null);
  const [healthTip, setHealthTip] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/explore")
      .then((response) => {
        const diseaseData = response.data.data || [];
        setDiseases(diseaseData);
        if (diseaseData.length > 0) {
          setFeaturedDisease(diseaseData[Math.floor(Math.random() * diseaseData.length)]);
        }
      })
      .catch(() => console.error("Error fetching diseases"));

    axios.get("http://localhost:5000/api/explore/healthTips/random")
      .then((response) => setHealthTip(response.data.tip || "Stay healthy!"))
      .catch(() => console.error("Error fetching health tip"));
  }, []);

  const filteredDiseases = diseases
    .filter(disease => disease.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === "A-Z" ? a.diseaseName.localeCompare(b.diseaseName) : b.diseaseName.localeCompare(a.diseaseName));

  return (
    <div className="explore-container">
      <h2 className="explore-header">Explore Diseases</h2>
      <input type="text" className="search-bar" placeholder="Search diseases..." onChange={(e) => setSearchTerm(e.target.value)} />
      <select className="filter-dropdown" onChange={(e) => setSortOrder(e.target.value)}>
        <option>A-Z</option>
        <option>Z-A</option>
      </select>

      {featuredDisease && (
        <div className="featured-disease">
          <h3>Featured Disease: {featuredDisease.diseaseName}</h3>
          <p>{featuredDisease.description}</p>
        </div>
      )}

      <div className="health-tip-box">
        <h3>Daily Health Tip</h3>
        <p>{healthTip}</p>
      </div>

      <div className="disease-grid">
        {filteredDiseases.map(disease => <DiseaseCard key={disease._id} disease={disease} />)}
      </div>
    </div>
  );
};

export default Explore;
