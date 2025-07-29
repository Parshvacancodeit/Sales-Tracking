import React, { useState, useEffect } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";
import "../../styles/AdminStyles/UserList.css";
import AssignmentViewer from "./AssignmentViewer";

const UserListByRole = () => {
  const [role, setRole] = useState("Telecaller");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [assignmentData, setAssignmentData] = useState(null);
  const [assignmentLoading, setAssignmentLoading] = useState(false);

  const fetchUsers = async (selectedRole) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/get-user?role=${selectedRole}`);
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignment = async (userId, role) => {
    setAssignmentLoading(true);
    setAssignmentData(null);
    try {
      const url =
        role === "Telecaller"
          ? `/admin/get-assign-tc/${userId}`
          : `/admin/get-assign-exe/${userId}`;
      const res = await axiosInstance.get(url);
      setAssignmentData(res.data.user);
    } catch (err) {
      alert("Failed to fetch assignment.");
    } finally {
      setAssignmentLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(role);
  }, [role]);

 const handleUserClick = (user) => {
  setSelectedUserId(user.id);
  fetchAssignment(user.id, user.role); // ✅ CORRECTED
};
  return (
    <div className="content-card">
      <h2 className="section-title">Users by Role</h2>

      <div style={{ display: "flex", gap: "12px", marginBottom: "1rem" }}>
        <label htmlFor="role">Select Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setAssignmentData(null); // clear assignment on role change
          }}
          style={{ padding: "6px 10px", borderRadius: "6px" }}
        >
          <option value="Telecaller">Telecaller</option>
          <option value="Executive">Executive</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table-style">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                onClick={() => handleUserClick(u)}
                style={{ cursor: "pointer" }}
              >
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {assignmentLoading && <p>Loading assignment...</p>}
      {!assignmentLoading && assignmentData && (
        <AssignmentViewer data={assignmentData} role={role} />
      )}
    </div>
  );
};

export default UserListByRole;
