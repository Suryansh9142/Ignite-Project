import React, { useEffect, useState } from "react";
import "./Hospital.css";

function Hospital({ user, setPage }) {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hospitals")
      .then((res) => res.json())
      .then((data) => setHospitals(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="hospital-container">
      <button className="back-btn" onClick={() => setPage("welcome")}>⬅ Back</button>
      
      <h2>Hospital List</h2>

      {hospitals.length === 0 ? (
        <p>No hospitals available</p>
      ) : (
        <ul>
          {hospitals.map((h, index) => (
            <li key={index}>
              <strong>{h.name}</strong> - {h.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Hospital;