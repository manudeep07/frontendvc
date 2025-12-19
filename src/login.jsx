import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.username); // store user for App.js routing

        // Navigate based on role
        if (data.username === "student") {
          navigate("/studentdas");
        } else if (data.username === "teacher") {
          navigate("/teacherdas");
        } else {
          alert("Unknown role");
        }
      } else {
        alert("Wrong email or password");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        name="username"
        placeholder="teacher or student"
        value={form.username}
        onChange={handleChange}
        autoComplete="username"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        autoComplete="current-password"
        required
      />
      <input type="submit" />
    </form>
  );
}

export default Login;
