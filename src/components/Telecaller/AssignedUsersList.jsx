import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import '../../styles/TelecallerStyles/AssignedUsersList.css';

const AssignedUsersList = () => {
  const [telecallers, setTelecallers] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/telecaller/get-assign")
      .then((res) => {
        setTelecallers(res.data.user.telecaller || []);
        setExecutives(res.data.user.executive || []);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to load assignments");
      });
  }, []);

  const handleExecutiveClick = (exec) => {
    setSelectedExecutive(exec);
    setSelectedLead(null);
    axiosInstance
      .get("/telecaller/get-all-lead", {
        params: { executive_id: exec.id },
      })
      .then((res) => {
        const leadsData = res.data.map(item => item.lead_data);
        setLeads(leadsData);
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to load leads");
        setLeads([]);
      });
  };

  const handleLeadClick = (lead) => {
    axiosInstance
      .get(`/telecaller/get-lead/${lead.id}`)
      .then((res) => {
        setSelectedLead(res.data.lead_data);
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to load lead details");
      });
  };

  const handleCloseExecutive = () => {
    setSelectedExecutive(null);
    setLeads([]);
    setSelectedLead(null);
  };

  const handleCloseLead = () => {
    setSelectedLead(null);
  };

  return (
    <div className="assigned-users-list">
      <h3>Assigned Telecallers</h3>
      {telecallers.length === 0 ? (
        <p>No Telecallers Assigned</p>
      ) : (
        <ul>
          {telecallers.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> ({user.email})
            </li>
          ))}
        </ul>
      )}

      <h3>Assigned Executives</h3>
      {executives.length === 0 ? (
        <p>No Executives Assigned</p>
      ) : (
        <ul>
          {executives.map((exec) => (
            <li
              key={exec.id}
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => handleExecutiveClick(exec)}
            >
              <strong>{exec.name}</strong> ({exec.email})
            </li>
          ))}
        </ul>
      )}

      {selectedExecutive && (
        <div className="leads-section card">
          <div className="card-header">
            <h4>Leads for {selectedExecutive.name}</h4>
            <button className="close-btn" onClick={handleCloseExecutive}>✖</button>
          </div>
          {leads.length === 0 ? (
            <p>No leads found</p>
          ) : (
            <ul>
              {leads.map((lead) => (
                <li
                  key={lead.id}
                  onClick={() => handleLeadClick(lead)}
                  style={{ cursor: "pointer", color: "green" }}
                >
                  {lead.lead.client_name} - {lead.lead.client_contact}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {selectedLead && (
  <div className="lead-details card">
    <button className="close-btn-inline" onClick={handleCloseLead}>✖</button>

    <h4>Lead Details</h4>
    <p><strong>Lead No:</strong> {selectedLead.lead.lead_no}</p>
    <p><strong>Client Name:</strong> {selectedLead.lead.client_name}</p>
    <p><strong>Contact:</strong> {selectedLead.lead.client_contact}</p>
    <p><strong>Address:</strong> {selectedLead.lead.client_address}</p>
    <p><strong>Description:</strong> {selectedLead.lead.description}</p>
    <p><strong>Created At:</strong> {new Date(selectedLead.lead.created_at).toLocaleString()}</p>
  </div>
)}

      {error && (
        <div className="error-box card">
          <div className="card-header">
            <h4>Error</h4>
            <button className="close-btn" onClick={() => setError(null)}>✖</button>
          </div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AssignedUsersList;
