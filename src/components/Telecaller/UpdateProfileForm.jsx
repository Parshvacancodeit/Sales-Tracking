// src/components/Telecaller/UpdateProfileForm.jsx
import React, { useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";

const UpdateProfileForm = () => {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put("/telecaller/update-profile", {
        email,
      });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      setResponse(null);
    }
  };

  return (
    <div className="update-profile-form">
      <form onSubmit={handleUpdate}>
        <label>Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter new email"
        />
        <button type="submit">Update Profile</button>
      </form>

      {response && (
        <div className="success-box">
          <h4>Profile Updated Successfully</h4>
          <p><strong>Name:</strong> {response.user.name}</p>
          <p><strong>Email:</strong> {response.user.email}</p>
          <p><strong>Role:</strong> {response.user.role}</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <h4>Error Updating Profile</h4>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdateProfileForm;
