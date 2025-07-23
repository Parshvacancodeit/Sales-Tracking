import React, { useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";

const CreateLeadForm = ({ executiveId }) => {
  const [lead, setLead] = useState({
    lead_no: "",
    client_name: "",
    client_contact: "",
    client_address: "",
    description: ""
  });

  const [errorMsg, setErrorMsg] = useState("");

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
        client_contact: `+91${lead.client_contact}`, // ✅ Add +91 before sending
        result: {},
        created_at: new Date().toISOString()
      }
    };

    try {
      await axiosInstance.post(
        `/telecaller/create-lead?executive_id=${executiveId}`,
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
        console.error("Backend says:", JSON.stringify(err.response.data, null, 2));
      } else {
        setErrorMsg("Failed to create lead. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Create Lead</h2>

      {Object.keys(lead).map((key) => (
        <div key={key} style={{ marginBottom: "10px" }}>
          <input
            name={key}
            placeholder={key === "client_contact" ? "Contact Number (10 digits)" : key.replace("_", " ").toUpperCase()}
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
