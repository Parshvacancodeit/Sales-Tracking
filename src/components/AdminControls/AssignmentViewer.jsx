import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/AdminStyles/ViewAssignments.css";

const AssignmentViewer = ({ data, role }) => {
  const [leadsMap, setLeadsMap] = useState({});
  const [selectedLead, setSelectedLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isTC = role === "Telecaller";
  const mainUser = isTC ? data.telecaller[0] : data.executive[0];
  const assignedUsers = isTC ? data.executive : data.telecaller;

  useEffect(() => {
    const fetchAllLeads = async () => {
      const temp = {};
      for (let user of assignedUsers) {
        try {
          const response = await axiosInstance.get("/admin/get-user-leads", {
            params: {
              user_id: user.id,
              role: isTC ? "Executive" : "Telecaller",
            },
          });
          temp[user.id] = response.data || [];
        } catch (error) {
          console.error("Error fetching leads for user:", user.id, error);
          temp[user.id] = [];
        }
      }
      setLeadsMap(temp);
    };

    fetchAllLeads();
  }, [assignedUsers, isTC]);

  // ✅ Updated handleLeadClick to handle API array structure
  const handleLeadClick = async (leadId) => {
    try {
      const res = await axiosInstance.get(`/admin/get-lead/${leadId}`);
      const responseArray = res.data;

      if (
        Array.isArray(responseArray) &&
        responseArray.length > 0 &&
        responseArray[0].lead_data
      ) {
        setSelectedLead(responseArray[0].lead_data);
        setModalOpen(true);
      } else {
        console.warn("Unexpected response structure:", res.data);
        alert("Invalid lead data received.");
      }
    } catch (err) {
      alert("Failed to fetch lead details.");
      console.error("Lead fetch error:", err);
    }
  };

  return (
    <div className="assignment-viewer">
      <div className="main-user-card">
        <h3>{isTC ? "Telecaller" : "Executive"}: Assigned</h3>
        <p><strong>Name:</strong> {mainUser.name}</p>
        <p><strong>Email:</strong> {mainUser.email}</p>
      </div>

      <div className="assigned-section">
        <h4>{isTC ? "Assigned Executives" : "Assigned Telecallers"}</h4>

        {assignedUsers.map((user) => (
          <div key={user.id} className="assigned-user-card">
            <h5>{user.name}</h5>
            <p><strong>Email:</strong> {user.email}</p>

            <div className="leads-list">
              <strong>Assigned Leads:</strong>
              <div className="lead-grid">
                {leadsMap[user.id]?.length > 0 ? (
                  leadsMap[user.id].map((item, index) => {
                    const lead = item.lead_data?.lead;
                    if (!lead) {
                      console.warn("Skipping invalid lead:", item);
                      return null;
                    }

                    return (
                      <div
                        className="lead-card"
                        key={index}
                        onClick={() => handleLeadClick(item.lead_data.id)}
                      >
                        <p><strong>Lead No:</strong> {lead.lead_no}</p>
                        <p><strong>Client:</strong> {lead.client_name}</p>
                        <p><strong>Contact:</strong> {lead.client_contact}</p>
                        <p><strong>Address:</strong> {lead.client_address}</p>
                        <p><strong>Description:</strong> {lead.description}</p>
                        <p><strong>Date:</strong> {new Date(lead.created_at).toLocaleString()}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-leads">No leads assigned.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for lead details */}
      {modalOpen && selectedLead && (
        <div className="lead-modal">
          <div className="lead-modal-content">
            <button className="close-btn" onClick={() => setModalOpen(false)}>×</button>
            <h3>Lead Details</h3>
            <p><strong>Lead No:</strong> {selectedLead.lead.lead_no}</p>
            <p><strong>Client Name:</strong> {selectedLead.lead.client_name}</p>
            <p><strong>Contact:</strong> {selectedLead.lead.client_contact}</p>
            <p><strong>Address:</strong> {selectedLead.lead.client_address}</p>
            <p><strong>Description:</strong> {selectedLead.lead.description}</p>
            <p><strong>Created At:</strong> {new Date(selectedLead.lead.created_at).toLocaleString()}</p>
            <hr />
            <p><strong>Telecaller:</strong> {selectedLead.telecaller.name} ({selectedLead.telecaller.email})</p>
            <p><strong>Executive:</strong> {selectedLead.executive.name} ({selectedLead.executive.email})</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentViewer;
