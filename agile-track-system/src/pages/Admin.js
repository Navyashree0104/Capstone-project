import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      
      <button onClick={() => navigate("/scrum")} className="scrum-btn">Scrum</button>
    </div>
  );
};

export default Admin;
