// src/components/Login.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role || "Admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://h2p-associates-s8tn.onrender.com/auth/sign-in?role=${role}`,
        new URLSearchParams({
          username,
          password,
          grant_type: "password",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate(`/${role.toLowerCase()}/dashboard`);
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>{role} Login</h2>
      <input
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;
