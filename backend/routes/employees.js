const express = require("express");
const router = express.Router();
const { connectDB, sql } = require("../db/db");

let pool;
connectDB().then(dbPool => pool = dbPool);

// ✅ Get All Employees
router.get("/", async (req, res) => {
    try {
        const result = await pool.request().query("SELECT * FROM EmployeDetails");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get Employee by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM Employees WHERE id = @id");
        if (result.recordset.length === 0) return res.status(404).json({ error: "Employee not found" });
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Insert New Employee
router.post("/", async (req, res) => {
    try {
        const { fname, lname, fkbid, fkdid, hiredate, position, salary } = req.body;
     
        const fkbidv = parseInt(fkbid, 10);
        const fkdidv = parseInt(fkdid, 10);
        const salaryParsed = parseFloat(salary);
        
        // Validations
        if (isNaN(fkbidv) || isNaN(fkdidv)) {
            return res.status(400).json({ error: "Branch ID and Department ID must be numbers" });
        }
        if (isNaN(salaryParsed) || salaryParsed <= 0) {
            return res.status(400).json({ error: "Salary must be a positive number" });
        }
        if (!fname || !lname || fkbid === undefined || fkdid === undefined || !hiredate || !position || salary === undefined) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (typeof fname !== 'string' || fname.trim() === '') {
            return res.status(400).json({ error: "First name must be a non-empty string" });
        }
        if (typeof lname !== 'string' || lname.trim() === '') {
            return res.status(400).json({ error: "Last name must be a non-empty string" });
        }
        const hireDateObj = new Date(hiredate);
        if (isNaN(hireDateObj.getTime())) {
            return res.status(400).json({ error: "Hire date must be a valid date in 'YYYY-MM-DD' format" });
        }
        if (typeof position !== 'string' || position.trim() === '') {
            return res.status(400).json({ error: "Position must be a non-empty string" });
        }

        await pool.request()
            .input("fn", sql.NVarChar, fname.trim())
            .input("ln", sql.NVarChar, lname.trim())
            .input("bid", sql.Int, fkbidv)
            .input("did", sql.Int, fkdidv)
            .input("date", sql.Date, hireDateObj)
            .input("pos", sql.NVarChar, position.trim())
            .input("salary", sql.Decimal(10, 2), salaryParsed)
            .execute("AddEmploy");

        res.status(201).json({ message: "Employee added successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

// ✅ Update Employee
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { fname, lname, position, salary } = req.body;

        // Validate fields
        if (!fname || !lname || !position || salary === undefined) {
            return res.status(400).json({ error: "All fields are required to update" });
        }
        const salaryParsed = parseFloat(salary);
        if (isNaN(salaryParsed) || salaryParsed <= 0) {
            return res.status(400).json({ error: "Salary must be a positive number" });
        }

        await pool.request()
            .input("id", sql.Int, id)
            .input("fname", sql.NVarChar, fname)
            .input("lname", sql.NVarChar, lname)
            .input("position", sql.NVarChar, position)
            .input("salary", sql.Decimal, salaryParsed)
            .query("UPDATE Employees SET F_name = @fname, L_name = @lname, position = @position, salary = @salary WHERE id = @id");

        res.json({ message: "Employee updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete Employee
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        const id2 = parseInt(id);

        const result = await pool.request()
            .input("id", sql.Int, id2)
            .execute("delEmp");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get /employees/:id/net-salary - Calculate net salary for an employee
router.get('/api/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "Invalid Employee ID" });
        }

        const result = await pool.request()
            .input("EmployeeID", sql.Int, id)
            .query("SELECT dbo.CalculateNetSalaryById(@EmployeeID) AS netSalary");

        if (result.recordset.length > 0) {
            res.json({ netSalary: result.recordset[0].netSalary });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error("Error calculating net salary:", error);
        res.status(500).json({ error: `Error calculating net salary ${error.message}` });
    }
});

module.exports = router;
