import React, { useEffect, useState } from "react";
import axiosInstance from "../assets/utils/axiosInstance";
import CreateUser from "../components/AdminControls/CreateUser";
import { useNavigate } from "react-router-dom";
import "../styles/AdminStyles/adminDashboard.css";
import UserListByRole from "../components/AdminControls/UserListByRole";
import AssignTelecallerToExecutive from "../components/AdminControls/AssignTelecallerToExecutive";
import ViewAssignments from "../components/AdminControls/ViewAssignments";
import ViewLeads from "../components/AdminControls/ViewLeads";
import GetAssignTc from "../components/AdminControls/GetAssignTc";




// React icons
import { FaUser, FaPlus, FaList, FaLink, FaHome } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [telecallers, setTelecallers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAssign, setSelectedAssign] = useState({ telecaller: "", agent: "" });
  const [selectedTcId, setSelectedTcId] = useState(""); // telecaller ID


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
      if (err.response?.status === 422) {
        alert("Validation error: Enter a valid email.");
      } else {
        alert("Failed to update profile.");
      }
    }
  };

  const handleGetUsersByRole = async (role) => {
    try {
      const res = await axiosInstance.get(`/admin/get-user?role=${role}`);
      setUsers(res.data);
    } catch (err) {
      alert("Error fetching users.");
    }
  };

  const handleCreateUser = async (formData) => {
    try {
      const res = await axiosInstance.post("/admin/create-user", formData);
      alert("User created successfully");
    } catch (err) {
      if (err.response?.status === 422) {
        alert("Validation error: Fill all fields properly.");
      } else {
        alert("Failed to create user");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (view === "assign") {
      axiosInstance.get("/admin/get-user?role=telecaller").then(res => setTelecallers(res.data));
      axiosInstance.get("/admin/get-user?role=agent").then(res => setAgents(res.data));
    }
  }, [view]);

  const handleAssign = async () => {
    if (!selectedAssign.telecaller || !selectedAssign.agent) {
      alert("Please select both telecaller and agent.");
      return;
    }

    try {
      await axiosInstance.post("/admin/assign", selectedAssign);
      alert("Agent assigned successfully.");
    } catch (err) {
      alert("Assignment failed.");
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
              <button className="form-button" onClick={handleUpdateProfile}>Update Email</button>
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
  return <AssignTelecallerToExecutive />;

  case "view-assignments":
  return <ViewAssignments />;

  case "get-assign-tc":
  return (
    <div className="content-card">
      <h2 className="section-title">View Assignment by Telecaller</h2>

      <div className="form-group">
        <label>Select Telecaller ID:</label>
        <input
          type="text"
          placeholder="Enter Telecaller ID"
          value={selectedTcId}
          onChange={(e) => setSelectedTcId(e.target.value)}
          className="form-input"
        />
      </div>

      {selectedTcId && <GetAssignTc telecallerId={selectedTcId} />}
    </div>
  );


      default:
        return null;

    case "leads":
      return <ViewLeads />
    }
  };

  return (
    <div className="admin-dashboard landing-container">
      <div className="admin-sidebar">
        <h2 className="logo">Admin Panel</h2>

        {/* Sidebar buttons with icons */}
        <button onClick={() => setView("profile")} className={`sidebar-btn ${view === "profile" ? "active" : ""}`}>
          <FaUser /> <span>Profile</span>
        </button>
        <button onClick={() => setView("create")} className={`sidebar-btn ${view === "create" ? "active" : ""}`}>
          <FaPlus /> <span>Create User</span>
        </button>
        <button onClick={() => setView("list")} className={`sidebar-btn ${view === "list" ? "active" : ""}`}>
          <FaList /> <span>User List</span>
        </button>
        <button onClick={() => setView("assign")} className={`sidebar-btn ${view === "assign" ? "active" : ""}`}>
          <FaLink /> <span>Assign Agent</span>
        </button>
        <button onClick={() => setView("view-assignments")} className={`sidebar-btn ${view === "view-assignments" ? "active" : ""}`}>
          <FaLink /> <span>View Assigned</span>
        </button>
        <button onClick={() => setView("leads")} className={`sidebar-btn ${view === "leads" ? "active" : ""}`}>
          <FaLink /> <span>View leads</span>
        </button>
        <button
  onClick={() => setView("get-assign-tc")}
  className={`sidebar-btn ${view === "get-assign-tc" ? "active" : ""}`}
>
  <FaLink /> <span>Get Assign TC</span>
</button>


        {/* Home button at bottom */}
        <div className="home-btn-container">
          <button onClick={() => navigate("/")} className="sidebar-btn home-btn">
            <FaHome /> <span>Home</span>
          </button>
        </div>
      </div>

      <div className="admin-main">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
