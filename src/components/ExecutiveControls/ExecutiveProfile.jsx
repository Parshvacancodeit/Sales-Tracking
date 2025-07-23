// src/components/ExecutiveControls/ExecutiveProfile.jsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";

const ExecutiveProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/executive/profile");
      setProfile(res.data.user);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch profile");
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="executive-section">
      <h2>Executive Profile</h2>
      {profile ? (
        <div className="profile-details">
          <p><strong>👤 Name:</strong> {profile.name}</p>
          <p><strong>📧 Email:</strong> {profile.email}</p>
          <p><strong>🧑‍💼 Role:</strong> {profile.role}</p>
          <p><strong>🆔 ID:</strong> {profile.id}</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>{JSON.stringify(error)}</p>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ExecutiveProfile;
