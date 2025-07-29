// TopNav.jsx
import React from "react";
import '../../styles/AdminStyles/TopNav.css';

const TTopNav = ({ setView }) => {
  return (
    <div className="topnav-fixed">
      <div className="topnav-content">
        <div className="topnav-logo">Telecaller Dashboard</div>
        <div className="topnav-buttons">
          <button onClick={() => setView("profile")}>My Profile</button>
        </div>
      </div>
    </div>
  );
};

export default TTopNav;
