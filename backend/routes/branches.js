const express = require("express");
const router = express.Router();
const { connectDB, sql } = require("../db/db");

let pool;
connectDB().then(dbPool => pool = dbPool);

// ✅ Get all branches
router.get("/", async (req, res) => {
    try {
        const result = await pool.request().query("SELECT * FROM Branch");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send("Error fetching branches.");
    }
});

// ✅ Insert new branch
// ✅ Insert new branch
router.post("/", async (req, res) => {
    const { B_name, B_location } = req.body;
    console.log("Received:", B_name, B_location);
    if (!B_name || !B_location) return res.status(400).send("Branch name and location are required.");

    try {
        const result = await pool.request()
            .input("B_name", sql.NVarChar, B_name)
            .input("B_location", sql.NVarChar, B_location)
            .query("INSERT INTO Branch (B_name, B_location) VALUES (@B_name, @B_location)");

        console.log("Insert Result:", result);
        res.status(201).send("Branch added successfully");
    } catch (err) {
        console.error("SQL Error:", err);
        res.status(500).send("Error adding branch");
    }
});


module.exports = router;
