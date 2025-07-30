import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { state } = useLocation();
  const role = state?.role || "Admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", email);
    formData.append("password", password);
    formData.append("scope", "");
    formData.append("client_id", "string");
    formData.append("client_secret", "********");

    try {
      const response = await axios.post(
        `https://h2p-associates-s8tn.onrender.com/auth/sign-in?role=${role}`,
        // `http://localhost:8000/auth/sign-in?role=${role}`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      alert("Login successful!");

      if (role === "Admin") {
        window.location.href = "/admin";
      } else if (role === "Telecaller") {
        window.location.href = "/telecaller";
      } else {
        window.location.href = "/executive";
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed: " + (error.response?.data?.detail || "Check credentials"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{role} Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="show-password-label">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </label>
        </div>

        <button onClick={handleLogin}>Login</button>

        <div className="forgot-link" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </div>
      </div>
    </div>
  );
};

export default Login;
