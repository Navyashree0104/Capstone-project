import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Clear input fields when the component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Get stored users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (!foundUser) {
      alert("Invalid email or password! Please sign up first.");
      return;
    }

    alert("Login successful!");
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser)); // Store logged-in user
    localStorage.setItem("isAuthenticated", "true"); // Mark user as logged in
    setIsAuthenticated(true);
    
    navigate("/dashboard"); // ✅ Redirect to Dashboard
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off" // Prevent autofill
        />
        
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password" // Prevent autofill issues
          />
          <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>

      <p>Don't have an account? <span className="link" onClick={() => navigate("/signup")}>Sign Up</span></p>
    </div>
  );
};

export default Login;
