import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Scrum from "./pages/Scrum";
import Header from "./components/Header";
import "./styles.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
    window.location.href = "/"; // ✅ Ensures redirect to Dashboard
  };

  return (
    <Router>
      {isAuthenticated && <Header onLogout={handleLogout} />} {/* ✅ Single Header */}
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />

        {/* ✅ Admin & Scrum Routes */}
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/" />} />
        <Route path="/scrum" element={isAuthenticated ? <Scrum /> : <Navigate to="/" />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
