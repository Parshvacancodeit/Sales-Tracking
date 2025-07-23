// src/components/AdminControls/ViewLeads.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/AdminStyles/viewLeads.css";

const ViewLeads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/admin/get-lead")
      .then((res) => {
        setLeads(res.data || []);
      })
      .catch((err) => {
        alert("Failed to load leads. Make sure you're logged in.");
        console.error(err);
      });
  }, []);

  return (
    <div className="content-card">
      <h2 className="section-title">All Leads Overview</h2>

      {leads.length === 0 ? (
        <p className="no-data">No leads found.</p>
      ) : (
        <div className="lead-list">
          {leads.map((item, idx) => {
            const data = item.lead_data;
            const { telecaller, executive, lead } = data;

            return (
              <div key={idx} className="lead-card">
                <div className="lead-header">
                  <div className="lead-number">🧾 Lead #{lead.lead_no}</div>
                  <div className="lead-date">
                    Created: {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="lead-columns">
                  <div className="lead-column">
                    <h4>📞 Telecaller</h4>
                    <p className="lead-name">{telecaller.name}</p>
                    <p className="lead-email">{telecaller.email}</p>
                  </div>

                  <div className="lead-column">
                    <h4>👨‍💼 Executive</h4>
                    <p className="lead-name">{executive.name}</p>
                    <p className="lead-email">{executive.email}</p>
                  </div>

                  <div className="lead-column">
                    <h4>🧑 Client Info</h4>
                    <p className="lead-name">{lead.client_name}</p>
                    <p>{lead.client_contact}</p>
                    <p>{lead.client_address}</p>
                    <p className="lead-desc">{lead.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewLeads;
