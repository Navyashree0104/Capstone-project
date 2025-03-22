import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // ✅ Ensure styles are applied

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Ensure fields are always blank on load
    setName("");
    setEmail("");
    setPassword("");
  }, []);

  const handleCreateUser = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role,
      tasks: [],
    };

    const storedUsers = JSON.parse(localStorage.getItem("employees")) || {};
    const updatedUsers = { ...storedUsers, [newUser.id]: newUser };
    localStorage.setItem("employees", JSON.stringify(updatedUsers));

    alert("User created successfully!");

    // ✅ Clear fields after submission
    setName("");
    setEmail("");
    setPassword("");

    navigate("/profile");
  };

  return (
    <div className="add-user-container">
      <div className="form-box">
        <h2>Add New User</h2>
        <form autoComplete="off"> {/* ✅ Prevents autofill */}
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            autoComplete="off"
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            autoComplete="off"
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="new-password"
          />

          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} autoComplete="off">
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>

          <div className="button-group">
            <button type="button" className="create-btn" onClick={handleCreateUser}>
              Create User
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate("/profile")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
