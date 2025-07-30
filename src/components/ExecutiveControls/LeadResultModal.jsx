// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../assets/utils/axiosInstance";
// import "../../styles/ExecutiveStyles/leadResultModal.css";

// const LeadResultModal = ({ leadId, onClose }) => {
//   const [status, setStatus] = useState("");
//   const [executiveId, setExecutiveId] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMsg, setSuccessMsg] = useState(null);
//     const [description, setDescription] = useState("");
//       const [next_meeting, setNextMeeting] = useState("");

//   // ✅ Fetch Executive ID on mount
//   useEffect(() => {
//     const fetchExecutiveId = async () => {
//       try {
//         const res = await axiosInstance.get("/executive/profile");
//         setExecutiveId(res.data.user.id);
//       } catch (err) {
//         console.error("Error fetching executive ID", err);
//         setError("Failed to fetch executive ID.");
//       }
//     };
//     fetchExecutiveId();
//   }, []);

//   useEffect(() => {
//     console.log("Modal opened for lead ID:", leadId);
//   }, [leadId]);

//   const handleSubmit = async () => {
//     if (!status || !executiveId) {
//       setError("Please select a status. Executive ID is missing.");
//       return;
//     }

//     setSubmitting(true);
//     setError(null);
//     console.log("Submitting lead result:", { leadId, status, executiveId });

//     try {
//       const res = await axiosInstance.post(
//         `/executive/create-lead-result/${leadId}`,
//         {
//           result: {
//             status: status,
//             description: "", // Optional - fill this later
//             next_meeting: new Date().toISOString(),
//             created_at: new Date().toISOString(),
//           },
//         },
//         {
//           params: { executive_id: executiveId },
//         }
//       );

//       setSuccessMsg("Lead status updated successfully.");
//       setTimeout(() => {
//         onClose();
//       }, 1000);
//     } catch (err) {
//       console.error("Submission failed", err);
//       setError(err.response?.data || "Failed to update lead status.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h3>Update Lead Status</h3>

//         <label>Status:</label>
//         <select value={status} onChange={(e) => setStatus(e.target.value)}>
//   <option value="">Select</option>
//   <option value="Closed">Closed</option>
//   <option value="Not closed">Not closed</option> {/* fixed here */}
// </select>
// <label>Description:</label>
//   <textarea
//     value={description}
//     onChange={(e) => setDescription(e.target.value)}
//     placeholder="Optional update description"
//     rows={3}
//   />
//   <label>Next Meeting Date:</label>
//   <input
//     type="text"
//     value={nextMeeting}
//     onChange={(e) => setNextMeeting(e.target.value)}
//     placeholder="DD/MM/YYYY (optional)"
//   />


//         {executiveId && (
//           <p className="executive-id-display">
//             👤 Executive ID auto-fetched: <strong>{executiveId}</strong>
//           </p>
//         )}

//         {error && <p className="error-text">{JSON.stringify(error)}</p>}
//         {successMsg && <p className="success-text">{successMsg}</p>}

//         <div className="modal-actions">
//           <button onClick={handleSubmit} disabled={submitting || !executiveId}>
//             {submitting ? "Submitting..." : "Submit"}
//           </button>
//           <button onClick={onClose} className="cancel-btn">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadResultModal;
import React, { useState, useEffect } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/ExecutiveStyles/leadResultModal.css";

const LeadResultModal = ({ leadId, onClose }) => {
  const [status, setStatus] = useState("");
  const [executiveId, setExecutiveId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [description, setDescription] = useState("");
  const [nextMeeting, setNextMeeting] = useState("");

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

    // Optional: Parse nextMeeting to ISO if it's a valid date
    let nextMeetingISO = null;
    if (nextMeeting.trim() !== "") {
      const parts = nextMeeting.split("/");
      if (parts.length === 3) {
        const [dd, mm, yyyy] = parts;
        const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
        if (!isNaN(dateObj)) {
          nextMeetingISO = dateObj.toISOString();
        } else {
          setError("Invalid date format for Next Meeting. Use DD/MM/YYYY.");
          setSubmitting(false);
          return;
        }
      } else {
        setError("Please use DD/MM/YYYY format for Next Meeting.");
        setSubmitting(false);
        return;
      }
    }

    try {
      const res = await axiosInstance.post(
        `/executive/create-lead-result/${leadId}`,
        {
          result: {
            status,
            description,
            next_meeting: nextMeetingISO || null,
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
          <option value="Not closed">Not closed</option>
        </select>

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional update description"
          rows={3}
        />

        <label>Next Meeting Date:</label>
        <input
          type="text"
          value={nextMeeting}
          onChange={(e) => setNextMeeting(e.target.value)}
          placeholder="DD/MM/YYYY (optional)"
        />

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
