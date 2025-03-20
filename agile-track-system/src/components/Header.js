import React from "react";
import { Link } from "react-router-dom";


const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <h1 className="title">Agile Tracking System</h1>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
