import React, { useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";

const UpdateLeadForm = ({ leadId, initialData, onBack }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    axiosInstance
      .put(`/telecaller/update-lead/${leadId}`, formData)
      .then(() => {
        alert("Lead updated successfully!");
        onBack();
      })
      .catch((err) => console.error("Update failed", err));
  };

  return (
    <div className="detail-view">
      <h2 className="title">Update Lead</h2>
      {["lead_no", "client_name", "client_contact", "client_address", "description"].map((field) => (
        <div key={field} className="form-group">
          <label>{field.replace(/_/g, " ")}:</label>
          <input
            type="text"
            name={field}
            value={formData[field] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="button-group">
        <button className="btn back" onClick={onBack}>← Cancel</button>
        <button className="btn update" onClick={handleSubmit}>💾 Save</button>
      </div>
    </div>
  );
};

export default UpdateLeadForm;
