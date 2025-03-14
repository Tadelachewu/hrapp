const express = require("express");
const router = express.Router();
const { connectDB, sql } = require("../db/db");

let pool;
connectDB().then(dbPool => pool = dbPool);

// ✅ Get All Employees
router.get("/", async (req, res) => {
    try {
        const result = await pool.request().query("SELECT * FROM Employees");
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
        if (!fname || !lname || !fkbid || !fkdid || !hiredate || !position) {
            return res.status(400).json({ error: "All fields must be provided" });
        }
        await pool.request()
            .input("fname", sql.NVarChar, fname)
            .input("lname", sql.NVarChar, lname)
            .input("fkbid", sql.Int, fkbid)
            .input("fkdid", sql.Int, fkdid)
            .input("hiredate", sql.Date, hiredate)
            .input("position", sql.NVarChar, position)
            .input("salary", sql.Decimal, salary)
            .query("INSERT INTO Employees (F_name, L_name, b_id, d_id, HireDate, position, salary) VALUES (@fname, @lname, @fkbid, @fkdid, @hiredate, @position, @salary)");
        res.status(201).json({ message: "Employee added successfully" });
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

module.exports = router;
