import React, { useState } from 'react';

function StudentQueryPage() {
  const [formData, setFormData] = useState({ query: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to backend
    setFormData({ query: '' }); // clear the field
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Welcome Student</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="query"
          value={formData.query}
          onChange={handleChange}
          placeholder="Type your query here..."
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default StudentQueryPage;
