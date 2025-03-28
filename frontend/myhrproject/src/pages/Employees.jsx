import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/employees";

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
  const [netSalaryResult, setNetSalaryResult] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Fetch employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError('Failed to fetch employees');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!Object.values(formData).every(value => value !== '')) {
      setError('Please fill in all fields');
      return;
    }

    try {
      if (editingId) {
        // Update existing employee
        await axios.put(`${API_URL}/${editingId}`, {
          name: `${formData.fname} ${formData.lname}`,
          position: formData.position,
          salary: formData.salary
        });
      } else {
        // Create new employee
        await axios.post(API_URL, formData);
      }

      resetForm();
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
      setError(error.response?.data?.error || 'Error saving employee');
    }
  };

  // Set up form for editing
  const handleEdit = (emp) => {
    const [fname, lname] = emp.F_name.split(' ');
    setFormData({
      fname,
      lname,
      fkbid: emp.b_id,
      fkdid: emp.d_id,
      hiredate: emp.HireDate.split('T')[0],
      position: emp.position,
      salary: emp.salary
    });
    setEditingId(emp.EMP_id);
  };

  // Handle employee deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError(error.response?.data?.error || 'Error deleting employee');
    }
  };

  // Calculate net salary
  const calculateNetSalary = async (employeeId) => {
    try {
      const response = await axios.get(`${API_URL}/api/${employeeId}`);

      // Correctly set the state with the response
      setNetSalaryResult({
        id: employeeId,
        amount: response.data.netSalary // Assuming the backend returns `netSalary`
      });
    } catch (error) {
      console.error("Error calculating net salary:", error);
      setError('Error calculating net salary');
    }
  };

  const resetForm = () => {
    setFormData({
      fname: '',
      lname: '',
      fkbid: '',
      fkdid: '',
      hiredate: '',
      position: '',
      salary: ''
    });
    setEditingId(null);
  };

  return (
    <div className="container">
      <h2>Employee Management System</h2>

      {error && <div className="error-message">{error}</div>}

      {netSalaryResult && (
        <div className="salary-result">
          Net Salary for Employee {netSalaryResult.id}:
          ${netSalaryResult.amount.toFixed(2)}
          <button onClick={() => setNetSalaryResult(null)} className="close-button">
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <h3>{editingId ? `Editing Employee #${editingId}` : 'Add New Employee'}</h3>

        <div className="form-grid">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Branch ID:</label>
            <input
              type="number"
              name="fkbid"
              value={formData.fkbid}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department ID:</label>
            <input
              type="number"
              name="fkdid"
              value={formData.fkdid}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor='date'>Hire Date:</label>
            <input
              type="date"
              id='date'
              name="hiredate"
              value={formData.hiredate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor='pos'>Position:</label>
            <input
              type="text"
              id='pos'
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor='sal'>Salary:</label>
            <input
              type="number"
              id='sal'
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn submit-btn">
            {editingId ? 'Update Employee' : 'Add Employee'}
          </button>
          {editingId && (
            <button type="button" className="btn cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Branch ID</th>
              <th>Dept ID</th>
              <th>Hire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.EMP_id}>
                <td>{emp.EMP_id}</td>
                <td>{emp.F_name}</td>
                <td>{emp.L_name}</td>
                <td>{emp.position}</td>
                <td>${emp.salary}</td>
                <td>{emp.b_id}</td>
                <td>{emp.d_id}</td>
                <td>{new Date(emp.HireDate).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => calculateNetSalary(emp.EMP_id)}
                      className="btn calc-btn"
                    >
                      Net Salary
                    </button>
                    <button
                      onClick={() => handleEdit(emp)}
                      className="btn edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.EMP_id)}
                      className="btn delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
