// TopNav.jsx
import React from "react";
import '../../styles/AdminStyles/TopNav.css';

const ETopNav = ({ setView }) => {
  return (
    <div className="topnav-fixed">
      <div className="topnav-content">
        <div className="topnav-logo">Executive Dashboard</div>
        <div className="topnav-buttons">
          <button onClick={() => setView("profile")}>My Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ETopNav;
