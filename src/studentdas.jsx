import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [formData, setFormData] = useState({ classId: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/verify-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId: formData.classId }),
      });

      const data = await response.json();

      if (data.status === "successful") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("classVerification", "successful");

        navigate("/student-query"); // React Router path
      } else {
        setError(data.message || "Class verification failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }

    setFormData({ classId: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Enter Class ID:{" "}
          <input
            type="text"
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            placeholder="Class ID"
            required
          />
        </label>

        <input type="submit" value="Join Class" />
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default StudentDashboard;
