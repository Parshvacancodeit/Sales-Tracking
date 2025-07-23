import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/TelecallerStyles/AllLeadsList.css";
 // 👉 CSS file for styling
 import LeadDetails from "./LeadDetails";
import UpdateLeadForm from "./UpdateLeadForm";
const AllLeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLeadData, setSelectedLeadData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/telecaller/get-all-lead")
      .then((res) => setLeads(res.data.map((l) => l.lead_data)))
      .catch((err) => console.error("Failed to fetch leads", err));
  }, []);

  const handleLeadClick = (leadId) => {
    axiosInstance
      .get(`/telecaller/get-lead/${leadId}`)
      .then((res) => setSelectedLeadData(res.data.lead_data))
      .catch((err) => console.error("Failed to fetch lead", err));
  };

  const handleBack = () => {
    setSelectedLeadData(null);
  };

  return (
    <div className="container">
      {!selectedLeadData ? (
        <>
          <h2 className="title">All Leads</h2>
          {leads.map((leadData, i) => (
            <div
              key={leadData.id || i}
              className="lead-card"
              onClick={() => handleLeadClick(leadData.id)}
            >
              <p><strong>Lead No:</strong> {leadData.lead.lead_no}</p>
              <p><strong>Client:</strong> {leadData.lead.client_name}</p>
              <p><strong>Contact:</strong> {leadData.lead.client_contact}</p>
              <p><strong>Description:</strong> {leadData.lead.description}</p>
            </div>
          ))}
        </>
      ) : (
        <LeadDetails leadData={selectedLeadData} onBack={handleBack} />
      )}
    </div>
  );
};

export default AllLeadsList;