import React, { useState } from 'react';
import './Leave.css';
const Leave = () => {
    // State to manage form input
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [leaveRequests, setLeaveRequests] = useState([]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = {
            leaveType,
            startDate,
            endDate,
            reason,
            status: 'Pending',
        };
        setLeaveRequests([...leaveRequests, newRequest]);
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setReason('');
    };

    return (
        <div className="leave-container">
            <h1>Leave Management</h1>

            {/* Leave Request Form */}
            <form className="leave-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="leaveType">Leave Type:</label>
                    <select
                        id="leaveType"
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                    >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Vacation Leave">Vacation Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reason">Reason for Leave:</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows="4"
                        placeholder="Enter the reason for your leave request"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Submit Leave Request
                </button>
            </form>

            {/* Leave History */}
            <h2>Leave Request History</h2>
            <table className="leave-history-table">
                <thead>
                    <tr>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((request, index) => (
                        <tr key={index}>
                            <td>{request.leaveType}</td>
                            <td>{request.startDate}</td>
                            <td>{request.endDate}</td>
                            <td>{request.reason}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leave;
