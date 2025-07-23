// src/pages/LandingPage.jsx
import React from 'react';
import '../styles/landing.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate('/login', { state: { role } });
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="src/assets/H2P.png" alt="H2P Logo" />
        </div>
        <div className="nav-placeholder">{/* Optional right section */}</div>
      </nav>

      {/* Main Section */}
      <div className="main-content">
        <div className="cards-container">
          <div className="login-card admin" onClick={() => handleRoleSelect('Admin')}>
            <h2>Login as Admin</h2>
            <p>Supervise roles and view progress reports.</p>
          </div>
          <div className="login-card telecaller" onClick={() => handleRoleSelect('Telecaller')}>
            <h2>Login as Telecaller</h2>
            <p>Generate and assign leads to agents.</p>
          </div>
          <div className="login-card agent" onClick={() => handleRoleSelect('Executive')}>
            <h2>Login as Executive</h2>
            <p>Meet clients and report status.</p>
          </div>
        </div>

        <div className="footer-note">
          Empowering Sales Teams Across India 🚀
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
