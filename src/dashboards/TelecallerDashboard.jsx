import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TelecallerProfile from "../components/Telecaller/TelecallerProfile";
import CreateLeadForm from "../components/Telecaller/CreateLeadForm";
import AllLeadsList from "../components/Telecaller/AllLeadsList";
import UpdateLeadForm from "../components/Telecaller/UpdateLeadForm";
import TTopNav from "../components/Telecaller/TTopNav";
import AssignedUsersList from "../components/Telecaller/AssignedUsersList";
import UpdateProfileForm from "../components/Telecaller/UpdateProfileForm";

import axiosInstance from "../assets/utils/axiosInstance"; // ✅
import "../styles/AdminStyles/adminDashboard.css";

// Icons
import { FaUser, FaEdit, FaPlus, FaList, FaHome } from "react-icons/fa";

const TelecallerDashboard = () => {
 const [view, setView] = useState("create-lead");
  const [executiveId, setExecutiveId] = useState(null); // ✅
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    const fetchAssigns = async () => {
      try {
        const response = await axiosInstance.get("/telecaller/get-assign");
        const executiveList = response?.data?.user?.executive;

        if (executiveList?.length > 0) {
          setExecutiveId(executiveList[0].id); // ✅ First assigned executive
        }
      } catch (err) {
        console.error("Failed to fetch assigned executive", err);
      }
    };

    fetchAssigns();
  }, []);

  const renderContent = () => {
    switch (view) {
      case "profile":
        return (
          <div className="content-card">
            <h2 className="section-title">Telecaller Profile</h2>
            <TelecallerProfile />
          </div>
        );

      case "update":
        return (
          <div className="content-card">
            <h2 className="section-title">Update Profile</h2>
            <UpdateProfileForm />
          </div>
        );

      case "create-lead":
        return (
          <div className="content-card">
            <h2 className="section-title">Create New Lead</h2>
            {executiveId ? (
              <CreateLeadForm executiveId={executiveId} />
            ) : (
              <p>Loading assigned executive...</p>
            )}
          </div>
        );



      case "view-leads":
        return (
          <div className="content-card">
            <h2 className="section-title">All Leads</h2>
            <AllLeadsList />
          </div>
        );
        



        case "assigned-users":
  return (
    <div className="content-card">
      <h2 className="section-title">Assigned Telecallers & Executives</h2>
      <AssignedUsersList />
    </div>
  );


      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard landing-container">
      <div className="admin-sidebar">
        <h2 className="logo">Telecaller Panel</h2>

    

        <button onClick={() => setView("create-lead")} className={`sidebar-btn ${view === "create-lead" ? "active" : ""}`}>
          <FaPlus /> <span>Create Lead</span>
        </button>

         <button onClick={() => setView("view-leads")} className={`sidebar-btn ${view === "view-leads" ? "active" : ""}`}>
          <FaList /> <span>All Leads</span>
        </button>


        <button onClick={() => setView("assigned-users")} className={`sidebar-btn ${view === "assigned-users" ? "active" : ""}`}>
  <FaUser /> <span>Telecallers</span>
</button>




       


        <div className="home-btn-container">
          <button onClick={() => navigate("/")} className="sidebar-btn home-btn">
            <FaHome /> <span>Home</span>
          </button>
        </div>
      </div>
<div className="admin-dashboard-body">
  <TTopNav setView={setView} /> 
      <div className="admin-main">
        {renderContent()}
      </div>
    </div>
  </div>
  );
};

export default TelecallerDashboard;
