import React, { useState } from "react";
import UpdateLeadForm from "./UpdateLeadForm";

const LeadDetails = ({ leadData, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <UpdateLeadForm
        leadId={leadData.id}
        initialData={leadData.lead}
        onBack={() => setIsEditing(false)}
      />
    );
  }

  const { lead, telecaller, executive } = leadData;

  return (
    <div className="detail-view">
      <h2 className="title">Lead Details</h2>

      <section className="info-group">
        <h3>Lead Info</h3>
        <p><strong>Lead No:</strong> {lead.lead_no}</p>
        <p><strong>Client Name:</strong> {lead.client_name}</p>
        <p><strong>Contact:</strong> {lead.client_contact}</p>
        <p><strong>Address:</strong> {lead.client_address}</p>
        <p><strong>Description:</strong> {lead.description}</p>
        <p><strong>Created At:</strong> {new Date(lead.created_at).toLocaleString()}</p>
      </section>

      <section className="info-group">
        <h3>Telecaller Info</h3>
        <p><strong>Name:</strong> {telecaller.name}</p>
        <p><strong>Email:</strong> {telecaller.email}</p>
        <p><strong>Role:</strong> {telecaller.role}</p>
      </section>

      <section className="info-group">
        <h3>Executive Info</h3>
        <p><strong>Name:</strong> {executive.name}</p>
        <p><strong>Email:</strong> {executive.email}</p>
        <p><strong>Role:</strong> {executive.role}</p>
      </section>

      <div className="button-group">
        <button className="btn back" onClick={onBack}>← Back</button>
        <button className="btn update" onClick={() => setIsEditing(true)}>✏️ Update</button>
      </div>
    </div>
  );
};

export default LeadDetails;
