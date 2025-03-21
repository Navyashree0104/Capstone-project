import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    // Check if scrumTasks already exists in localStorage
    if (!localStorage.getItem("scrumTasks")) {
      const initialTasks = [
        {
          title: "Optimize database queries",
          description: "Working on performance optimization and testing",
          status: "In Progress",
          teamMembers: ["navyashree0104@gmail.com", "charlie@example.com"]
        }
      ];
      localStorage.setItem("scrumTasks", JSON.stringify(initialTasks));
    }
  }, []);

  return (
    <div className="dashboard">
      <Header onLogout={onLogout} />

      <div className="dashboard-container">
        <header className={`header ${loggedInUser?.role === "user" ? "user-dashboard-header" : ""}`}>
          <h1 className="title">Agile Tracking System</h1>
          <nav>
            {loggedInUser ? (
              <>
                <button onClick={() => navigate("/home")} className="nav-btn">Home</button>
                <button onClick={() => navigate("/profile")} className="nav-btn">Profile</button>

                {/* ✅ Admin-Only Buttons */}
                {loggedInUser?.role === "admin" && (
                  <>
                    <button onClick={() => navigate("/add-scrum")} className="nav-btn admin-btn">
                      Add New Scrum
                    </button>
                    <button onClick={() => navigate("/add-user")} className="nav-btn admin-btn">
                      Add New User
                    </button>
                  </>
                )}

                <button onClick={() => {
                  localStorage.removeItem("loggedInUser");
                  localStorage.removeItem("isAuthenticated");
                  navigate("/login");
                }} className="nav-btn logout-btn">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
                <button onClick={() => navigate("/signup")} className="nav-btn">Sign Up</button>
              </>
            )}
          </nav>
        </header>

        <div className="welcome-content">
          <h2>Welcome to the Agile Tracking System</h2>
          <p className="quote">
            "Agility is not an option but a necessity in today's fast-changing world."  
            <br />— Jim Highsmith
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
