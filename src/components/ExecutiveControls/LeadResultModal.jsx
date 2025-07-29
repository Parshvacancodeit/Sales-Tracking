import React, { useState, useEffect } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/ExecutiveStyles/leadResultModal.css";

const LeadResultModal = ({ leadId, onClose }) => {
  const [status, setStatus] = useState("");
  const [executiveId, setExecutiveId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // ✅ Fetch Executive ID on mount
  useEffect(() => {
    const fetchExecutiveId = async () => {
      try {
        const res = await axiosInstance.get("/executive/profile");
        setExecutiveId(res.data.user.id);
      } catch (err) {
        console.error("Error fetching executive ID", err);
        setError("Failed to fetch executive ID.");
      }
    };
    fetchExecutiveId();
  }, []);

  useEffect(() => {
    console.log("Modal opened for lead ID:", leadId);
  }, [leadId]);

  const handleSubmit = async () => {
    if (!status || !executiveId) {
      setError("Please select a status. Executive ID is missing.");
      return;
    }

    setSubmitting(true);
    setError(null);
    console.log("Submitting lead result:", { leadId, status, executiveId });

    try {
      const res = await axiosInstance.post(
        `/executive/create-lead-result/${leadId}`,
        {
          result: {
            status: status,
            description: "", // Optional - fill this later
            next_meeting: new Date().toISOString(),
            created_at: new Date().toISOString(),
          },
        },
        {
          params: { executive_id: executiveId },
        }
      );

      setSuccessMsg("Lead status updated successfully.");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Submission failed", err);
      setError(err.response?.data || "Failed to update lead status.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Lead Status</h3>

        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
  <option value="">Select</option>
  <option value="Closed">Closed</option>
  <option value="Not closed">Not closed</option> {/* fixed here */}
</select>


        {executiveId && (
          <p className="executive-id-display">
            👤 Executive ID auto-fetched: <strong>{executiveId}</strong>
          </p>
        )}

        {error && <p className="error-text">{JSON.stringify(error)}</p>}
        {successMsg && <p className="success-text">{successMsg}</p>}

        <div className="modal-actions">
          <button onClick={handleSubmit} disabled={submitting || !executiveId}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadResultModal;
