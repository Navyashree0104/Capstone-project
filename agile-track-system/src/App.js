import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ScrumList from "./pages/ScrumList";
import AddScrum from "./pages/AddScrum";
import AddUser from "./pages/AddUser";
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
  };

  return (
    <Router>
      {isAuthenticated && <Header onLogout={handleLogout} />} {/* ✅ Header shown only when authenticated */}

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected Routes */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/" />} />
        <Route path="/add-user" element={isAuthenticated ? <AddUser /> : <Navigate to="/" />} />
        <Route path="/scrum" element={isAuthenticated ? <ScrumList /> : <Navigate to="/" />} />
        <Route path="/add-scrum" element={isAuthenticated ? <AddScrum /> : <Navigate to="/" />} />
        <Route path="/edit-scrum/:id" element={isAuthenticated ? <AddScrum /> : <Navigate to="/" />} />

        {/* ✅ Handle Unknown Routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
