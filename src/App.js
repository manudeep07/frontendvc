import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import StudentDashboard from "./studentdas.jsx";
import TeacherDashboard from "./teacherdas.jsx";
import TeacherQueryPage from "./TeacherQueryPage.jsx";
import StudentQueryPage from "./StudentQueryPage.jsx";

const containerStyle = {
  fontFamily: "Arial, sans-serif",
  padding: "40px",
  textAlign: "center",
  backgroundColor: "#f9f9f9",
  minHeight: "100vh",
};

const headingStyle = {
  fontSize: "2.5rem",
  marginBottom: "10px",
  color: "#333",
};

const descriptionStyle = {
  fontSize: "1.1rem",
  marginBottom: "30px",
  color: "#666",
};

const linkStyle = {
  textDecoration: "none",
  color: "#4a90e2",
  fontWeight: "bold",
  margin: "0 15px",
};

function App() {
  return (
    <BrowserRouter>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Welcome to Our App</h1>
        <p style={descriptionStyle}>
          Please login or signup to access the full features of the application.
        </p>

        <div>
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
          |
          <Link to="/signup" style={linkStyle}>
            Signup
          </Link>
        </div>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student Dashboard */}
          <Route
            path="/studentdas"
            element={
              localStorage.getItem("token") &&
              localStorage.getItem("user") === "student" ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Teacher Dashboard */}
          <Route
            path="/teacherdas"
            element={
              localStorage.getItem("token") &&
              localStorage.getItem("user") === "teacher" ? (
                <TeacherDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Teacher Query Page */}
          <Route
            path="/teacherQuery"
            element={
              localStorage.getItem("token") &&
              localStorage.getItem("teacherVerification") === "successful" ? (
                <TeacherQueryPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Student Query Page */}
          <Route
            path="/student-query"
            element={
              localStorage.getItem("token") &&
              localStorage.getItem("studentVerification") === "successful" ? (
                <StudentQueryPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
