import React, { useState } from "react";
import "./Form.css";
import "./home.css"; 

function Login({ setPage, setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user); // Save logged in user
        setPage("welcome");
      } else {
        alert(data.message || "Invalid username or password");
      }
    } catch (err) {
      alert("Server error. Try again!");
    }
  };

  return (
    <div className="home-container">

      <header className="home-header">
        <div className="home-logo">
          <h1>IgniteBuddy</h1>
        </div>
        <button className="home-btn" onClick={() => setPage("dashboard")}>
          Back
        </button>
      </header>

      <div className="form-container">
        <div className="form-wrapper">
          <h2 className="form-title">Login</h2>
          <form onSubmit={submitLogin} className="form-box">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />

            <button type="submit" className="form-btn">Login</button>
          </form>
        </div>
      </div>

      <footer className="home-footer">
        <p>© 2025 IgniteBuddy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
