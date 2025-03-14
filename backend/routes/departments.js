const express = require("express");
const router = express.Router();
const { connectDB, sql } = require("../db/db");

let pool;
connectDB().then(dbPool => pool = dbPool);

// ✅ Get all departments (Uses stored procedure)
router.get("/", async (req, res) => {
    try {
        const result = await pool.request().execute("GetDepartments");
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).send("Error fetching departments.");
    }
});

// ✅ Insert a new department (Uses stored procedure)
router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        await pool.request()
            .input("name", sql.NVarChar, name)
            .execute("InsertDepartment");
        res.status(201).send("Department created successfully.");
    } catch (err) {
        res.status(500).send("Error creating department.");
    }
});

// ✅ Delete a department by ID (Uses stored procedure)
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.request()
            .input("id", sql.Int, id)
            .execute("delDept");
        res.status(200).send("Department deleted successfully.");
    } catch (err) {
        res.status(500).send("Error deleting department.");
    }
});

module.exports = router;
