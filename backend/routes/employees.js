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

        // Validate required fields
        if (!fname || !lname || !fkbid || !fkdid || !hiredate || !position || salary === undefined) {
            return res.status(400).json({ error: "All fields must be provided" });
        }

        // Validate data types
        if (typeof fname !== 'string' || typeof lname !== 'string') {
            return res.status(400).json({ error: "First name and last name must be strings" });
        }

        if (typeof fkbid !== 'number' || typeof fkdid !== 'number') {
            return res.status(400).json({ error: "Branch ID and Department ID must be numbers" });
        }

        //Validate hiredate (should be a valid date)
        const hireDateObj = new Date(hiredate);
        if (isNaN(hireDateObj.getTime())) {
            return res.status(400).json({ error: "Hire date must be a valid date" });
        }

        // Validate position (should be a string and non-empty)
        if (typeof position !== 'string' || position.trim() === '') {
            return res.status(400).json({ error: "Position must be a valid non-empty string" });
        }


        // Validate salary (must be a positive number)
        if (typeof salary !== 'number' || salary <= 0) {
            return res.status(400).json({ error: "Salary must be a positive number" });
        }


        // Call the stored procedure
        await pool.request()
            .input("fname", sql.NVarChar, fname)
            .input("lname", sql.NVarChar, lname)
            .input("fkbid", sql.Int, fkbid)
            .input("fkdid", sql.Int, fkdid)
            .input("hiredate", sql.Date, hiredate)
            .input("position", sql.NVarChar, position)
            .input("salary", sql.Decimal, salary)
            .execute("InsertEmployee"); // Call the stored procedure

        res.status(201).json({ message: "Employee added successfully via stored procedure" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update Employee
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, salary } = req.body;
        await pool.request()
            .input("id", sql.Int, id)
            .input("name", sql.NVarChar, name)
            .input("position", sql.NVarChar, position)
            .input("salary", sql.Decimal, salary)
            .query("UPDATE Employees SET name = @name, position = @position, salary = @salary WHERE id = @id");
        res.json({ message: "Employee updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete Employee
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.request().input("id", sql.Int, id).query("DELETE FROM Employees WHERE id = @id");
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /employees/:id/net-salary - Calculate net salary for an employee
// Assuming Express.js backend
router.get('/api/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Execute the query and ensure to handle the returned recordset correctly
        const result = await pool.request()
            .input("EmployeeID", sql.Int, id)
            .query("SELECT dbo.CalculateNetSalaryById(@EmployeeID) AS netSalary");

        // Check if the query returns data
        if (result.recordset.length > 0) {
            res.json({ netSalary: result.recordset[0].netSalary }); // Return the netSalary value from the query result
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error("Error calculating net salary:", error);
        res.status(500).json({ error: 'Error calculating net salary' });
    }
});




module.exports = router;
