// src/components/ExecutiveControls/GetLeadById.jsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance"; // ✅ your custom axios config

const GetLeadById = () => {
  const [allLeads, setAllLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [leadData, setLeadData] = useState(null);

  // ✅ Fetch all leads using axiosInstance
  useEffect(() => {
    axiosInstance
      .get("/executive/get-all-lead")
      .then((res) => {
        const leads = res.data.map((item) => item.lead_data);
        setAllLeads(leads);
      })
      .catch((err) => {
        console.error("Error fetching leads", err);
      });
  }, []);

  const handleSelect = (id) => {
    setSelectedLeadId(id);
    const selected = allLeads.find((lead) => lead.id === id);
    setLeadData(selected || null);
  };

  return (
    <div className="get-lead-container">
      <h2>View Lead Details</h2>

      <select
        value={selectedLeadId}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Select Lead</option>
        {allLeads.map((lead) => (
          <option key={lead.id} value={lead.id}>
            {lead.lead.lead_no} — {lead.lead.client_name}
          </option>
        ))}
      </select>

      {leadData && (
        <div className="lead-details">
          <h3>Lead Info</h3>
          <p><strong>Lead No:</strong> {leadData.lead.lead_no}</p>
          <p><strong>Client:</strong> {leadData.lead.client_name}</p>
          <p><strong>Contact:</strong> {leadData.lead.client_contact}</p>
          <p><strong>Address:</strong> {leadData.lead.client_address}</p>
          <p><strong>Description:</strong> {leadData.lead.description}</p>

          <h4>Telecaller</h4>
          <p>{leadData.telecaller.name} ({leadData.telecaller.email})</p>

          <h4>Executive</h4>
          <p>{leadData.executive.name} ({leadData.executive.email})</p>
        </div>
      )}
    </div>
  );
};

export default GetLeadById;
