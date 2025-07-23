import React, { useState, useEffect } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import '../../styles/ExecutiveStyles/CreateLeadResult.css';

const CreateLeadResult = () => {
  const [allLeads, setAllLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState("");

  const [resultData, setResultData] = useState({
    status: "",
    description: "",
    next_meeting: "",
    created_at: new Date().toISOString(),
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [executiveId, setExecutiveId] = useState(null);

  // 👤 Fetch executive ID
  useEffect(() => {
    const fetchExecutiveId = async () => {
      try {
        const res = await axiosInstance.get("/executive/profile");
        setExecutiveId(res.data.user.id);
      } catch (err) {
        console.error("Failed to fetch executive ID", err);
      }
    };
    fetchExecutiveId();
  }, []);

  // 📥 Fetch all leads
  useEffect(() => {
    axiosInstance
      .get("/executive/get-all-lead")
      .then((res) => {
        const leads = res.data.map((item) => item.lead_data);
        setAllLeads(leads);
      })
      .catch((err) => {
        console.error("Error fetching leads", err);
      });
  }, []);

  // ✅ Submit result
  const handleCreateResult = async () => {
    if (!selectedLeadId || !executiveId) {
      setError("Lead ID and Executive ID are required");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/executive/create-lead-result/${selectedLeadId}`,
        { result: resultData },
        {
          params: { executive_id: executiveId },
        }
      );
      setResponse(res.data);
      setError(null);
      // Optional: Reset form
      setResultData({
        status: "",
        description: "",
        next_meeting: "",
        created_at: new Date().toISOString(),
      });
      setSelectedLeadId("");
    } catch (err) {
      setResponse(null);
      setError(err.response?.data || "Error creating result");
    }
  };

  return (
    <div className="executive-section">
      <h2>Create Lead Result</h2>

      {/* 🎯 Dropdown to select lead */}
      <select
        value={selectedLeadId}
        onChange={(e) => setSelectedLeadId(e.target.value)}
      >
        <option value="">Select Lead</option>
        {allLeads.map((lead) => (
          <option key={lead.id} value={lead.id}>
            {lead.lead.lead_no} — {lead.lead.client_name}
          </option>
        ))}
      </select>

      {/* ✅ Dropdown for Status */}
      <select
        value={resultData.status}
        onChange={(e) =>
          setResultData({ ...resultData, status: e.target.value })
        }
      >
        <option value="">Select Status</option>
        <option value="Closed">Closed</option>
        <option value="Not closed">Not closed</option>
      </select>

      {/* 📝 Description */}
      <input
        type="text"
        placeholder="Description"
        value={resultData.description}
        onChange={(e) =>
          setResultData({ ...resultData, description: e.target.value })
        }
      />

      {/* 📅 Next Meeting Date */}
      <input
        type="datetime-local"
        value={resultData.next_meeting}
        onChange={(e) =>
          setResultData({ ...resultData, next_meeting: e.target.value })
        }
      />

      {/* 🚀 Submit Button */}
      <button onClick={handleCreateResult}>Submit Result</button>

      {/* 🟢 Response or 🔴 Error */}
      {response && (
  <div className="result-card">
    <h3>✅ Lead Result Submitted</h3>
    <p><strong>Status:</strong> {response.result_data.status}</p>
    <p><strong>Description:</strong> {response.result_data.description}</p>
    <p><strong>Next Meeting:</strong> {new Date(response.result_data.next_meeting).toLocaleString()}</p>
    <p><strong>Created At:</strong> {new Date(response.result_data.created_at).toLocaleString()}</p>
  </div>
)}

      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}
    </div>
  );
};

export default CreateLeadResult;
