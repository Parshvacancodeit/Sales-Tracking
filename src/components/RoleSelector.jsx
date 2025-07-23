// src/components/RoleSelector.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate("/login", { state: { role } });
  };

  return (
    <div>
      <h2>Select Role</h2>
      <button onClick={() => handleSelect("Admin")}>Admin</button>
      <button onClick={() => handleSelect("Manager")}>Manager</button>
      <button onClick={() => handleSelect("Salesman")}>Salesman</button>
    </div>
  );
};

export default RoleSelector;
