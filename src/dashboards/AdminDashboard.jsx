import React, { useEffect, useState } from "react";
import axiosInstance from "../assets/utils/axiosInstance";
import CreateUser from "../components/AdminControls/CreateUser";
import { useNavigate } from "react-router-dom";
import "../styles/AdminStyles/adminDashboard.css";
import UserListByRole from "../components/AdminControls/UserListByRole";
import AssignTelecallerToExecutive from "../components/AdminControls/AssignTelecallerToExecutive";
import ViewAssignments from "../components/AdminControls/ViewAssignments";
import ViewLeads from "../components/AdminControls/ViewLeads";
import TopNav from "../components/AdminControls/TopNav";

import { FaUser, FaPlus, FaLink, FaHome } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("list"); // ✅ Default view
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  const fetchProfile = () => {
    axiosInstance
      .get("/admin/profile")
      .then((res) => {
        setProfile(res.data.user);
        setEmail(res.data.user.email);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("Failed to fetch profile.");
        }
      });
  };

  useEffect(() => {
    if (view === "profile") {
      fetchProfile();
    }
  }, [view]);

  const handleUpdateProfile = async () => {
    try {
      const res = await axiosInstance.put("/admin/update-profile", { email });
      alert("Profile updated!");
      setProfile(res.data.user);
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      await axiosInstance.post("/admin/create-user", formData);
      alert("User created successfully");
    } catch (err) {
      alert("Failed to create user");
    }
  };

  const renderContent = () => {
    switch (view) {
      case "profile":
        return (
          <div className="content-card">
            <h2 className="section-title">Admin Profile</h2>
            <p><strong>Name:</strong> {profile?.name}</p>
            <p><strong>Role:</strong> {profile?.role}</p>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
              <button className="form-button" onClick={handleUpdateProfile}>Update</button>
            </div>
          </div>
        );
      case "create":
        return (
          <div className="content-card">
            <CreateUser onSubmit={handleCreateUser} />
          </div>
        );
      case "list":
        return <UserListByRole />;
      case "assign":
        return (
          <div>
            <AssignTelecallerToExecutive />
            <ViewAssignments />
          </div>
        );
      case "leads":
        return <ViewLeads />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard landing-container">

  

      <div className="admin-sidebar">
        <button onClick={() => setView("list")} className={`sidebar-btn ${view === "list" ? "active" : ""}`}>
          <FaUser /> <span>Users</span>
        </button>
        <button onClick={() => setView("assign")} className={`sidebar-btn ${view === "assign" ? "active" : ""}`}>
          <FaLink /> <span>Assign</span>
        </button>
        <button onClick={() => setView("leads")} className={`sidebar-btn ${view === "leads" ? "active" : ""}`}>
          <FaLink /> <span>Leads</span>
        </button>

        <div className="home-btn-container">
          <button onClick={() => navigate("/")} className="sidebar-btn home-btn">
            <FaHome /> <span>Home</span>
          </button>
        </div>
      </div>

<div className="admin-dashboard-body">
  <TopNav setView={setView} /> 
      <div className="admin-main">


        {renderContent()}
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;
