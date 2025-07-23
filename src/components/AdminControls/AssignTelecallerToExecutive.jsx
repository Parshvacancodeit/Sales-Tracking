import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";

const AssignTelecallerToExecutive = () => {
  const [telecallers, setTelecallers] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [selectedTelecaller, setSelectedTelecaller] = useState("");
  const [selectedExecutive, setSelectedExecutive] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch users based on role
  const fetchUsers = async () => {
    try {
      const teleRes = await axiosInstance.get("/admin/get-user?role=Telecaller");
      const execRes = await axiosInstance.get("/admin/get-user?role=Executive");
      setTelecallers(teleRes.data || []);
      setExecutives(execRes.data || []);
    } catch (err) {
      alert("Failed to fetch users. Please check your network or auth.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAssign = async () => {
    if (!selectedTelecaller || !selectedExecutive) {
      setMessage("Please select both telecaller and executive.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/admin/assign", {
        telecaller: selectedTelecaller,
        executive: selectedExecutive,
      });

      setMessage("✅ Assignment successful!");
    } catch (err) {
      setMessage("❌ Assignment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-card">
      <h2>Assign Telecaller to Executive</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <select
          value={selectedTelecaller}
          onChange={(e) => setSelectedTelecaller(e.target.value)}
        >
          <option value="">Select Telecaller</option>
          {telecallers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <select
          value={selectedExecutive}
          onChange={(e) => setSelectedExecutive(e.target.value)}
        >
          <option value="">Select Executive</option>
          {executives.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <button onClick={handleAssign} disabled={loading}>
          {loading ? "Assigning..." : "Assign"}
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignTelecallerToExecutive;
