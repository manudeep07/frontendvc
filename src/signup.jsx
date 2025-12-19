import React, { useState } from 'react';

function Signup() {
  const [form, setForm] = useState({ username:'',email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const t = await response.text(); // get plain text

      document.getElementById("k").innerText = t;

    } catch (error) {
      document.getElementById("k").innerText = "Server error";
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="teacher or student"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <input type="submit"/>

      {/* Message container */}
      <p id="k"></p>
    </form>
  );
}

export default Signup;
