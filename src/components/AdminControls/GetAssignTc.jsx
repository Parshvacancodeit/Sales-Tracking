// src/components/AdminControls/GetAssignTc.jsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/AdminStyles/viewAssignments.css"; // reuse your existing styles

const GetAssignTc = ({ telecallerId }) => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!telecallerId) return;

    setLoading(true);
    axiosInstance
      .get(`/admin/get-assign-tc/${telecallerId}`)
      .then((res) => {
        setAssignment(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assigned data:", err);
        setLoading(false);
      });
  }, [telecallerId]);

  if (loading) return <p>Loading...</p>;

  if (!assignment) return <p>No assignment found.</p>;

  return (
    <div className="assignment-list">
      <div className="assignment-card">
        <div className="telecaller">
          <span className="role-label">Telecaller</span>
          {assignment.telecaller?.length ? (
            <>
              <p className="user-name">{assignment.telecaller[0].name}</p>
              <p className="user-email">{assignment.telecaller[0].email}</p>
            </>
          ) : (
            <p className="no-data">No telecaller data.</p>
          )}
        </div>

        <div className="executives">
          <span className="role-label">Assigned Executives</span>
          {assignment.executive?.length ? (
            assignment.executive.map((exec) => (
              <div key={exec.id} className="executive-item">
                <p className="user-name">{exec.name}</p>
                <p className="user-email">{exec.email}</p>
              </div>
            ))
          ) : (
            <p className="no-executive">No executives assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAssignTc;
