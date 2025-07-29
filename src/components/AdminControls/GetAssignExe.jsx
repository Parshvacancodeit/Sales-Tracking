// src/components/AdminControls/GetAssignExe.jsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/AdminStyles/ViewAssignments.css"; // reuse same styles

const GetAssignExe = ({ executiveId }) => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!executiveId) return;

    setLoading(true);
    axiosInstance
      .get(`/admin/get-assign-exe/${executiveId}`)
      .then((res) => {
        setAssignment(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assigned data:", err);
        setLoading(false);
      });
  }, [executiveId]);

  if (loading) return <p>Loading assignments...</p>;
  if (!assignment) return <p>No assignment found.</p>;

  return (
    <div className="assignment-list">
      <div className="assignment-card">
        <div className="executive">
          <span className="role-label">Executive</span>
          {assignment.executive?.length ? (
            <>
              <p className="user-name">{assignment.executive[0].name}</p>
              <p className="user-email">{assignment.executive[0].email}</p>
            </>
          ) : (
            <p className="no-data">No executive data.</p>
          )}
        </div>

        <div className="telecallers">
          <span className="role-label">Assigned Telecallers</span>
          {assignment.telecaller?.length ? (
            assignment.telecaller.map((tc) => (
              <div key={tc.id} className="executive-item">
                <p className="user-name">{tc.name}</p>
                <p className="user-email">{tc.email}</p>
              </div>
            ))
          ) : (
            <p className="no-executive">No telecallers assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAssignExe;
