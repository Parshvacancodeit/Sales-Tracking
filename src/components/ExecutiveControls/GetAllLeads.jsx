import React, { useState, useEffect } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/ExecutiveStyles/getAllLeads.css";
import LeadResultModal from "./LeadResultModal";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaClock,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

const GetAllLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeLeadId, setActiveLeadId] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/executive/get-all-lead");
        setLeads(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data || "Error fetching leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleCardClick = (leadId) => {
    console.log("Clicked lead ID:", leadId);
    setActiveLeadId(leadId);
    setShowModal(true);
  };

  return (
    <div className="executive-section">
      <h2>All Leads</h2>

      {loading && <p>Loading leads...</p>}
      {error && <p className="error-text">{JSON.stringify(error)}</p>}

      <div className="leads-container">
        {leads.map((item, index) => {
          const { id, lead_data } = item;
          const { telecaller, executive, lead } = lead_data;

          return (
            <div
              className="lead-card clickable"
              key={index}
              onClick={() => handleCardClick(lead_data.id)}

            >
              <h3><FaFileAlt /> Lead No: {lead.lead_no}</h3>
              <p><FaUser /> Client: {lead.client_name}</p>
              <p><FaPhone /> Contact: {lead.client_contact}</p>
              <p><FaMapMarkerAlt /> Address: {lead.client_address}</p>
              <p><FaFileAlt /> Description: {lead.description}</p>
              <p><FaClock /> Created At: {lead.created_at}</p>

              <div className="lead-sub-info">
                <div>
                  <h4><FaUsers /> Telecaller</h4>
                  <p><FaUser /> {telecaller.name}</p>
                  <p><FaEnvelope /> {telecaller.email}</p>
                </div>
                <div>
                  <h4><FaUserTie /> Executive</h4>
                  <p><FaUser /> {executive.name}</p>
                  <p><FaEnvelope /> {executive.email}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && activeLeadId && (
        <LeadResultModal
          leadId={activeLeadId}
          onClose={() => {
            setShowModal(false);
            setActiveLeadId(null);
          }}
        />
      )}
    </div>
  );
};

export default GetAllLeads;
