const express = require("express");
const router = express.Router();
const { connectDB, sql } = require("../db/db");

let pool;
connectDB().then(dbPool => pool = dbPool);

// ✅ Get all departments
router.get("/", async (req, res) => {
    try {
        const result = await pool.request().query("SELECT * FROM department");
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).send("Error fetching departments.");
    }
});

// ✅ Insert new department
router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        await pool.request().input("name", sql.NVarChar, name).query("INSERT INTO department (D_name) VALUES (@name)");
        res.status(201).send("Department created successfully.");
    } catch (err) {
        res.status(500).send("Error creating department.");
    }
});

module.exports = router;
