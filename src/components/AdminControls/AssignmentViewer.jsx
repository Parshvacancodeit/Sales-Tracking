import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/AdminStyles/ViewAssignments.css";

const AssignmentViewer = ({ data, role }) => {
  const [leadsMap, setLeadsMap] = useState({}); // user_id => [leads]

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
              {leadsMap[user.id]?.length > 0 ? (
                leadsMap[user.id].map((item, index) => {
                  const lead = item.lead_data?.lead;
                  if (!lead) return null;

                  return (
                    <div className="lead-card" key={index}>
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
        ))}
      </div>
    </div>
  );
};

export default AssignmentViewer;
