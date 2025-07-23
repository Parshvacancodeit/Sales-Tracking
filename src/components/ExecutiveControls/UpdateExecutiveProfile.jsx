// src/components/ExecutiveControls/UpdateExecutiveProfile.jsx

import React, { useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";

const UpdateExecutiveProfile = () => {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.put("/executive/update-profile", { email });
      setResponse(res.data);
    } catch (error) {
      setResponse({ error: error.response?.data || "Something went wrong" });
    }
  };

  return (
    <div className="executive-section">
      <h2>Update Executive Profile</h2>
      <input
        type="email"
        placeholder="New Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>

      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
};

export default UpdateExecutiveProfile;
