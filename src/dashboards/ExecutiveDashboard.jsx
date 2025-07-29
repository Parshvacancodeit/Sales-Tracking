import React, { useEffect, useState } from "react";
import axiosInstance from "../assets/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/AdminStyles/adminDashboard.css";

// Executive control components
import ExecutiveProfile from "../components/ExecutiveControls/ExecutiveProfile";
import UpdateExecutiveProfile from "../components/ExecutiveControls/UpdateExecutiveProfile";
import GetSingleLead from "../components/ExecutiveControls/GetSingleLead";
import GetAllLeads from "../components/ExecutiveControls/GetAllLeads";
import AssignedUsersExecutive from "../components/ExecutiveControls/AssignedUsersExecutive";
import ETopNav from "../components/ExecutiveControls/ETopNav";
import CreateLeadResult from "../components/ExecutiveControls/CreateLeadResult";

// Icons
import { FaUser, FaEdit, FaEye, FaClipboardList, FaPlus, FaHome } from "react-icons/fa";

const ExecutiveDashboard = () => {
  const navigate = useNavigate();
const [view, setView] = useState("get-all");
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);





  const renderContent = () => {
    switch (view) {
    
      case "profile":
     return <ExecutiveProfile />;


      case "update":
        return <UpdateExecutiveProfile />;

      case "get-single":
        return <GetSingleLead />;

      case "get-all":
        return <GetAllLeads />;

      case "view-assign":
  return (
    <div className="content-card">
      <h2 className="section-title">Assigned Telecallers & Executives</h2>
      <AssignedUsersExecutive />
    </div>
  );


      case "create-result":
        return <CreateLeadResult />;

      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard landing-container">
      <div className="admin-sidebar">
        <h2 className="logo">Executive Panel</h2>

        <button
  onClick={() => setView("get-all")}
  className={`sidebar-btn ${view === "get-all" ? "active" : ""}`}
>
  <FaClipboardList /> <span>Leads</span>
</button>

<button
  onClick={() => setView("view-assign")}
  className={`sidebar-btn ${view === "view-assign" ? "active" : ""}`}
>
  <FaUser /> <span>Telecallers</span>
</button>

        <div className="home-btn-container">
          <button onClick={() => navigate("/")} className="sidebar-btn home-btn">
            <FaHome /> <span>Home</span>
          </button>
        </div>
      </div>
<div className="admin-dashboard-body">
  <ETopNav setView={setView} /> 
      <div className="admin-main">
        {renderContent()}
      </div>
    </div>
    </div>
  );
};

export default ExecutiveDashboard;
