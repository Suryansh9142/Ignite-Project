import React from "react";
import "./welcome.css";

function Welcome({ user, setPage }) {
  const handleNavigation = (pageName) => {
    setPage(pageName);
  };

  return (
    <div className="welcome-container">
      <button className="back-btn" onClick={() => setPage("login")}>⬅ Back</button>

      <h1 className="welcome-title">Welcome, {user.username}!</h1>

      <div className="blocks-container">
        
        <div className="block" onClick={() => handleNavigation("pg")}>
          <img src="https://cdn-icons-png.flaticon.com/512/1946/1946433.png" alt="PG" />
          <p>PG / Hostel</p>
        </div>

        <div className="block" onClick={() => handleNavigation("restaurant")}>
          <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Restaurant" />
          <p>Restaurant / Hotel</p>
        </div>

        <div className="block" onClick={() => handleNavigation("hospital")}>
          <img src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png" alt="Hospital" />
          <p>Hospital</p>
        </div>

      </div>

      <button onClick={() => setPage("login")} className="logout-btn">Logout</button>

    </div>
  );
}

export default Welcome;
