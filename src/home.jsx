import React from "react"; 
import Slider from "./Slider";
import "./Home.css";

function Home({ setPage }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-logo">
          <h1 >IgniteBuddy</h1>
        </div>
        
        <div className="home-buttons">
          <button className="home-btn" onClick={() => setPage("login")}>Login</button>
          <button className="home-btn" onClick={() => setPage("register")}>Register</button>
        </div>
      </header>

      <main className="home-main">
        <p className="home-quote">
          Find the best food, PGs, and more — rated by trainees, trusted by trainees!
        </p>
        <Slider />
      </main>

      <footer className="home-footer">
        <p>© 2025 IgniteBuddy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
