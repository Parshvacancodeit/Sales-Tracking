// TopNav.jsx
import React from "react";
import '../../styles/AdminStyles/TopNav.css';

const TopNav = ({ setView }) => {
  return (
    <div className="topnav-fixed">
      <div className="topnav-content">
        <div className="topnav-logo">Admin Dashboard</div>
        <div className="topnav-buttons">
          <button onClick={() => setView("create")}>Create User</button>
          <button onClick={() => setView("profile")}>My Profile</button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
