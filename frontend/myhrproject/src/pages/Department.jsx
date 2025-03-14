import axios from "axios";
import React, { useEffect, useState } from "react";
import './Department.css';
const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ name: "" });

  // Fetch departments from backend
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/departments", formData);
      fetchDepartments(); // Refresh departments list
      setFormData({ name: "" }); // Clear form
    } catch (error) {
      console.error("Error adding department", error);
    }
  };

  return (
    <div className="container">
      <h2>Department Management</h2>

      {/* Error Message */}
      <div id="error-message"></div>

      {/* Add Department Form */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Department Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Department</button>
      </form>

      {/* Department Table */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.D_id}>
              <td>{department.D_id}</td>
              <td>{department.D_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Department;
