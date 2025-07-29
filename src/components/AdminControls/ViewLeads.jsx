// src/components/AdminControls/ViewLeads.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/AdminStyles/viewLeads.css";

const ViewLeads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/admin/get-all-leads")
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
            const data = item?.lead_data;
            const telecaller = data?.telecaller || {};
            const executive = data?.executive || {};
            const lead = data?.lead || {};

            return (
              <div key={idx} className="lead-card">
                <div className="lead-header">
                  <div className="lead-number">🧾 Lead #{lead.lead_no || "N/A"}</div>
                  <div className="lead-date">
                    Created:{" "}
                    {lead.created_at
                      ? new Date(lead.created_at).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>

                <div className="lead-columns">
                  <div className="lead-column">
                    <h4>📞 Telecaller</h4>
                    <p className="lead-name">{telecaller.name || "N/A"}</p>
                    <p className="lead-email">{telecaller.email || "N/A"}</p>
                  </div>

                  <div className="lead-column">
                    <h4>👨‍💼 Executive</h4>
                    <p className="lead-name">{executive.name || "N/A"}</p>
                    <p className="lead-email">{executive.email || "N/A"}</p>
                  </div>

                  <div className="lead-column">
                    <h4>🧑 Client Info</h4>
                    <p className="lead-name">{lead.client_name || "N/A"}</p>
                    <p>{lead.client_contact || "N/A"}</p>
                    <p>{lead.client_address || "N/A"}</p>
                    <p className="lead-desc">{lead.description || "No description"}</p>
                  </div>
                </div>

                {/* Optional: Show result object if exists */}
                {lead.result && Object.keys(lead.result).length > 0 && (
                  <div className="lead-result">
                    <h4>📊 Result</h4>
                    <pre>{JSON.stringify(lead.result, null, 2)}</pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewLeads;
