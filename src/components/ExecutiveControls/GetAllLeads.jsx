import React, { useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/ExecutiveStyles/getAllLeads.css";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaClock,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

const GetAllLeads = () => {
  const [telecallerId, setTelecallerId] = useState("");
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = {};
      if (telecallerId.trim()) {
        params.telecaller_id = telecallerId.trim();
      }

      const response = await axiosInstance.get("/executive/get-all-lead", {
        params,
      });

      setLeads(response.data);
      setError(null);
    } catch (err) {
      setLeads([]);
      setError(err.response?.data || "Error fetching leads");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="executive-section">
      <h2>All Leads</h2>
      <div className="lead-filter-bar">
        <input
          type="text"
          placeholder="(Optional) Telecaller ID"
          value={telecallerId}
          onChange={(e) => setTelecallerId(e.target.value)}
        />
        <button onClick={fetchLeads} disabled={loading}>
          {loading ? "Loading..." : "Fetch Leads"}
        </button>
      </div>

      {error && <p className="error-text">{JSON.stringify(error)}</p>}

      <div className="leads-container">
        {leads.map((item, index) => {
          const { lead_data } = item;
          const { telecaller, executive, lead } = lead_data;

          return (
            <div className="lead-card" key={index}>
              <h3><FaFileAlt /> Lead No: {lead.lead_no}</h3>
              <p><FaUser /> Client: {lead.client_name}</p>
              <p><FaPhone /> Contact: {lead.client_contact}</p>
              <p><FaMapMarkerAlt /> Address: {lead.client_address}</p>
              <p><FaFileAlt /> Description: {lead.description}</p>
              <p><FaClock /> Created At: {lead.created_at}</p>

              <div className="lead-sub-info">
                <div>
                  <h4><FaUsers /> Telecaller</h4>
                  <p><FaUser /> {telecaller.name}</p>
                  <p><FaEnvelope /> {telecaller.email}</p>
                </div>
                <div>
                  <h4><FaUserTie /> Executive</h4>
                  <p><FaUser /> {executive.name}</p>
                  <p><FaEnvelope /> {executive.email}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetAllLeads;
