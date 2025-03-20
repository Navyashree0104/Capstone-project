import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div className="dashboard-container">
      <header className={`header ${loggedInUser?.role === "user" ? "user-dashboard-header" : ""}`}>
        <h1 className="title">Agile Tracking System</h1>
        <nav>
          {loggedInUser ? (
            <>
              <button onClick={() => navigate("/home")} className="nav-btn">Home</button>
              <button onClick={() => navigate("/profile")} className="nav-btn">Profile</button>
              <button onClick={() => {
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("isAuthenticated");
                navigate("/login");
              }} className="nav-btn">Logout</button>

              {/* Show "Add New Scrum" only for Admin */}
              {loggedInUser?.role === "admin" && (
                <button onClick={() => navigate("/add-scrum")} className="nav-btn">Add New Scrum</button>
              )}
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
  );
};

export default Dashboard;
