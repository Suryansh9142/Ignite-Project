import React, { useState } from "react";
import "./Form.css";

function Register({ setPage }) {
  const [formData, setFormData] = useState({
    username: "",
    empId: "",
    batch: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    const { username, empId, batch, password, confirmPassword } = formData;

    if (!username || !empId || !batch || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Send data to Express backend
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, empId, batch, password })
    });

    const data = await res.json();

    if (data.success) {
      alert("Register Successful!");
      setPage("login");
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submitRegister} className="form-box">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
        />

        <input
          type="text"
          placeholder="Employee ID"
          name="empId"
          value={formData.empId}
          onChange={handleChange}
          className="form-input"
        />

        <input
          type="text"
          placeholder="Ignite Batch"
          name="batch"
          value={formData.batch}
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

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" className="form-btn">
          Register
        </button>
      </form>

      <button onClick={() => setPage("dashboard")} className="back-btn">
        Back
      </button>
    </div>
  );
}

export default Register;
