import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Branches.module.css';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({ B_name: '', B_location: '' });
  const [error, setError] = useState('');

  // Fetch branches from backend
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/branches');
      setBranches(response.data);
    } catch (err) {
      console.error('Error fetching branches:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.B_name || !formData.B_location) {
      setError('Please enter both branch name and location.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/branches', formData);
      fetchBranches(); // Refresh branches list
      setFormData({ B_name: '', B_location: '' }); // Reset form
    } catch (err) {
      console.error('Error adding branch:', err);
      setError('Error adding branch. Please try again.');
    }
  };

  return (
    <div className={styles.branchContainer}>
      <h2>Branch Management</h2>

      {error && <div className={styles.error}>{error}</div>}

      {/* Branch Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor='B_name'>Branch Name</label>
        <input
          type="text"
          name="B_name"
          placeholder="Branch Name"
          value={formData.B_name}
          onChange={handleChange}
        />
        <label htmlFor='B_location'>Branch Location</label>
        <input
          type="text"
          name="B_location"
          placeholder="Branch Location"
          value={formData.B_location}
          onChange={handleChange}
        />
        <button type="submit">Add Branch</button>
      </form>

      {/* Branch Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Branch Name</th>
            <th>Branch Location</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.B_id}>
              <td>{branch.B_id}</td>
              <td>{branch.B_name}</td>
              <td>{branch.B_location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Branches;
