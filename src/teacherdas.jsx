import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [formData, setFormData] = useState({ classId: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/create-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId: formData.classId }),
      });

      const data = await response.json();

      // ✅ MATCH backend response
      if (data.status === "successful") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("teacherVerification", "successful");

        navigate("/teacherQuery");
      } else {
        setError("Teacher verification failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }

    setFormData({ classId: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Teacher Dashboard</h2>

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

        <input type="submit" value="Create Class" />
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TeacherDashboard;
