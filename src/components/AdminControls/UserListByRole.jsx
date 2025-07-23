import React, { useState } from "react";
import axiosInstance from "../../assets/utils/axiosInstance";

const UserListByRole = () => {
   const [role, setRole] = useState("Telecaller"); // ✅ Correct

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/get-user?role=${role}`);
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-card">
      <h2>View Users by Role</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Telecaller">Telecaller</option>
          <option value="Executive">Executive</option>
        </select>
        <button onClick={fetchUsers}>Fetch</button>
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
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListByRole;
