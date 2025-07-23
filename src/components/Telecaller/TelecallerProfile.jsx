import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance"; // ✅ Use your configured instance

const TelecallerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/telecaller/profile"); // ✅ Double-check this route
        setProfile(res.data.user || res.data); // adapt to API response shape
      } catch (err) {
        console.error("Failed to load profile", err);
        setError("Profile load failed. " + (err.response?.statusText || ""));
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-card">
      <h3>Name: {profile.name}</h3>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
};

export default TelecallerProfile;
