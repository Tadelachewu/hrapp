import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/employees"; // Backend
const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    fkbid: '',
    fkdid: '',
    hiredate: '',
    position: '',
    salary: ''
  });
  const [error, setError] = useState('');

  // Fetch employees from backend
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation to ensure all fields are filled
    if (!formData.fname || !formData.lname || !formData.fkbid || !formData.fkdid || !formData.hiredate || !formData.position || !formData.salary) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send POST request to the backend API
      await axios.post(API_URL, formData);

      // Reset form data
      setFormData({
        fname: '',
        lname: '',
        fkbid: '',
        fkdid: '',
        hiredate: '',
        position: '',
        salary: ''
      });

      setError(''); // Clear error message
      fetchEmployees(); // Refresh employee list
    } catch (error) {
      console.error("Error adding employee:", error);
      setError('Error adding employee. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Employee Management</h2>

      {/* Error message */}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {/* Add Employee Form */}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="fname">First Name:</label>
          <input
            type='text'
            id="fname"
            name="fname"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lname">Last Name:</label>
          <input
            type='text'
            id="lname"
            name="lname"
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="fkbid">Branch ID:</label>
          <input
            type='number'
            id="fkbid"
            name="fkbid"
            placeholder="Branch ID"
            value={formData.fkbid}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="fkdid">Department ID:</label>
          <input
            type='number'
            id="fkdid"
            name="fkdid"
            placeholder="Department ID"
            value={formData.fkdid}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor='salary'>Salary</label>
          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="hiredate">Hire Date:</label>
          <input
            id="hiredate"
            name="hiredate"
            type="date"
            value={formData.hiredate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="position">Position:</label>
          <input
            type='text'
            id="position"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Add Employee</button>
        </div>
      </form>

      {/* Employee Table */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>branch Id</th>
            <th>Departmrnt Id</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.EMP_id}>
              <td>{emp.EMP_id}</td>
              <td>{emp.F_name} </td>
              <td>{emp.L_name}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>{emp.b_id}</td>
              <td>{emp.d_id} </td>
              <td>{emp.HireDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;