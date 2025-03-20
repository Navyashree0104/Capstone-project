import React from "react";
import { useNavigate } from "react-router-dom";

const Scrum = () => {
  const navigate = useNavigate();

  return (
    <div className="scrum-container">
      <h2>Scrum Details</h2>
      <p>Scrum management and details will be displayed here.</p>
      <button onClick={() => navigate("/admin")} className="back-btn">Back to Admin</button>
    </div>
  );
};

export default Scrum;
