import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";

const CreateLeadForm = () => {
  const [lead, setLead] = useState({
    lead_no: "",
    client_name: "",
    client_contact: "",
    client_address: "",
    description: ""
  });

  const [executives, setExecutives] = useState([]);
  const [selectedExecutiveId, setSelectedExecutiveId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch assigned executives
  useEffect(() => {
    axiosInstance.get("/telecaller/get-assign")
      .then((res) => {
        const list = res?.data?.user?.executive || [];
        setExecutives(list);
        if (list.length > 0) setSelectedExecutiveId(list[0].id); // Default selection
      })
      .catch((err) => console.error("Failed to fetch executives", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]:
        name === "client_contact"
          ? value.replace(/\D/g, "").slice(0, 10) // only digits, max 10
          : value.trimStart()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedExecutiveId) {
      setErrorMsg("Please select an executive.");
      return;
    }

    if (lead.client_contact.length !== 10) {
      setErrorMsg("Contact number must be exactly 10 digits.");
      return;
    }

    if (!lead.lead_no || !lead.client_name) {
      setErrorMsg("Please fill all required fields.");
      return;
    }

    const payload = {
      lead: {
        ...lead,
        client_contact: `+91${lead.client_contact}`,
        result: {},
        created_at: new Date().toISOString()
      }
    };

    try {
      await axiosInstance.post(
        `/telecaller/create-lead?executive_id=${selectedExecutiveId}`,
        payload
      );
      alert("Lead created successfully!");

      setLead({
        lead_no: "",
        client_name: "",
        client_contact: "",
        client_address: "",
        description: ""
      });
    } catch (err) {
      console.error("Create lead failed", err);
      if (err.response?.data) {
        setErrorMsg(err.response.data.detail?.[0]?.msg || "Server validation failed");
      } else {
        setErrorMsg("Failed to create lead. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Create Lead</h2>

      {/* Executive Dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <label>Assign Executive:</label>
        <select
          value={selectedExecutiveId}
          onChange={(e) => setSelectedExecutiveId(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
        >
          {executives.map((exec) => (
            <option key={exec.id} value={exec.id}>
              {exec.name} ({exec.email})
            </option>
          ))}
        </select>
      </div>

      {/* Other Inputs */}
      {["lead_no", "client_name", "client_contact", "client_address", "description"].map((key) => (
        <div key={key} style={{ marginBottom: "10px" }}>
          <input
            name={key}
            placeholder={
              key === "client_contact"
                ? "Contact Number (10 digits)"
                : key.replace("_", " ").toUpperCase()
            }
            value={lead[key]}
            onChange={handleChange}
            required={["lead_no", "client_name", "client_contact"].includes(key)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
      ))}

      {errorMsg && <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>}

      <button type="submit" style={{ padding: "10px 20px" }}>
        Create
      </button>
    </form>
  );
};

export default CreateLeadForm;
