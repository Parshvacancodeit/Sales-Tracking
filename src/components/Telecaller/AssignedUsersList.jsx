// src/components/Telecaller/AssignedUsersList.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";

const AssignedUsersList = () => {
  const [telecallers, setTelecallers] = useState([]);
  const [executives, setExecutives] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/telecaller/get-assign")
      .then((res) => {
        setTelecallers(res.data.user.telecaller || []);
        setExecutives(res.data.user.executive || []);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to load assignments");
      });
  }, []);

  return (
    <div className="assigned-users-list">
      <h3>Assigned Telecallers</h3>
      {telecallers.length === 0 ? <p>No Telecallers Assigned</p> : (
        <ul>
          {telecallers.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong> ({user.email})
            </li>
          ))}
        </ul>
      )}

      <h3>Assigned Executives</h3>
      {executives.length === 0 ? <p>No Executives Assigned</p> : (
        <ul>
          {executives.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong> ({user.email})
            </li>
          ))}
        </ul>
      )}

      {error && (
        <div className="error-box">
          <h4>Error</h4>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AssignedUsersList;
