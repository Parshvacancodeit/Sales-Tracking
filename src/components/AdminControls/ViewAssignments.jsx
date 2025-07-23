import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/AdminStyles/ViewAssignments.css";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem("token"); // Adjust key if needed

      try {
        const response = await axiosInstance.get("/admin/get-all-assign", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setAssignments(response.data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err?.response?.data?.detail || "Failed to fetch assignments.");
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="assignment-list">
      <h2 className="section-title">All Assigned Executives</h2>

      {error && <p className="no-data">{error}</p>}

      {assignments.length === 0 && !error && (
        <p className="no-data">No assignments found.</p>
      )}

      {assignments.map((assign, index) => (
        <div className="assignment-card" key={index}>
          {/* Telecaller Section */}
          <div className="telecaller">
            <span className="role-label">Telecaller</span>
            {assign?.user?.telecaller?.length > 0 ? (
              assign.user.telecaller.map((tc) => (
                <div key={tc.id}>
                  <div className="user-name">{tc.name}</div>
                  <div className="user-email">{tc.email}</div>
                </div>
              ))
            ) : (
              <p className="no-executive">No telecaller assigned</p>
            )}
          </div>

          {/* Executive Section */}
          <div className="executives">
            <span className="role-label">Executives</span>
            {assign?.user?.executive?.length > 0 ? (
              assign.user.executive.map((ex) => (
                <div key={ex.id} className="executive-item">
                  <div className="user-name">{ex.name}</div>
                  <div className="user-email">{ex.email}</div>
                </div>
              ))
            ) : (
              <p className="no-executive">No executive assigned</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewAssignments;
