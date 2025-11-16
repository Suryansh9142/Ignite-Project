import React, { useEffect, useState } from "react";
import "./Restaurant.css";

function Restaurant({ user, setPage }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="restaurant-container">
      <button className="back-btn" onClick={() => setPage("welcome")}>⬅ Back</button>
      
      <h2>Restaurant List</h2>

      {restaurants.length === 0 ? (
        <p>No restaurants available</p>
      ) : (
        <ul>
          {restaurants.map((r, index) => (
            <li key={index}>
              <strong>{r.name}</strong> - {r.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Restaurant;