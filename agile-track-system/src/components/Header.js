import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onLogout }) => {
  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title">Agile Tracking System</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {isAdmin && <li><Link to="/add-user">Add User</Link></li>} {/* ✅ Admin Only */}
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
