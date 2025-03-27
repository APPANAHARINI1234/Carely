import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DiseaseDetail.css";

const DiseaseDetail = () => {
  const { id } = useParams();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`https://carely-health-7zfg.onrender.com/api/explore/${id}`)
      .then((response) => {
        if (response.data && response.data.data) {
          setDisease(response.data.data);
        } else {
          setError("No data found for this disease.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch disease details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading disease details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!disease) return <p>No disease data available.</p>;

  return (
    <div className="disease-detail-container">
      <h2>{disease.diseaseName || "Unknown Disease"}</h2>
      {disease.image && <img src={disease.image} alt={disease.diseaseName} className="disease-image" />}
      
      <div className="section">
        <h3>Category</h3>
        <p>{disease.category || "Not Available"}</p>
      </div>

      <div className="section">
        <h3>Description</h3>
        <p>{disease.description || "No description available."}</p>
      </div>

      <div className="section">
        <h3>Early Signs</h3>
        {Array.isArray(disease.earlySigns) && disease.earlySigns.length > 0 ? (
          <ul>
            {disease.earlySigns.map((sign, index) => <li key={index}>{sign}</li>)}
          </ul>
        ) : <p>No early signs available.</p>}
      </div>

      <div className="section">
        <h3>Causes</h3>
        {disease.causes && Object.keys(disease.causes).length > 0 ? (
          <ul>
            {Object.entries(disease.causes).map(([type, list]) => (
              <li key={type}><strong>{type}:</strong> {Array.isArray(list) ? list.join(", ") : list}</li>
            ))}
          </ul>
        ) : <p>No known causes available.</p>}
      </div>

      <div className="section">
        <h3>Recommended Diet & Exercise</h3>
        <p><strong>Diet:</strong> {disease.remedies?.diet || "No specific diet available."}</p>
        <p><strong>Exercise:</strong> {disease.remedies?.exercise || "Exercise recommendations not available."}</p>
      </div>

      {Array.isArray(disease.remedies?.yogaPoses) && disease.remedies.yogaPoses.length > 0 && (
        <div className="section">
          <h3>Yoga Poses</h3>
          <div className="yoga-grid">
            {disease.remedies.yogaPoses.map((pose, index) => {
              const formattedPose = pose.trim().replace(/ /g, "_").toLowerCase();
              return (
                <div key={index} className="yoga-item">
                  <img src={`/images/yoga/${formattedPose}.png`} alt={pose} className="yoga-image" />
                  <p>{pose}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="section">
        <h3>Precautions</h3>
        {Array.isArray(disease.precautions) && disease.precautions.length > 0 ? (
          <ul>
            {disease.precautions.map((precaution, index) => <li key={index}>{precaution}</li>)}
          </ul>
        ) : <p>No specific precautions available.</p>}
      </div>
    </div>
  );
};

export default DiseaseDetail;
