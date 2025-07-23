import React, { useState } from "react";
import '../../styles/AdminStyles/CreateUser.css'
const CreateUser = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", form);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        required
      >
        <option value="">Select Role</option>
        <option value="Telecaller">Telecaller</option>
        <option value="Executive">Executive</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateUser;
