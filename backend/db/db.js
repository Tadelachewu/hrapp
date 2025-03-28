const sql = require("mssql");
require("dotenv").config();

// Configuring the database connection using environment variables
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server:  process.env.DB_SERVER,
    database: process.env.DB_DATABASE, // all above are required
    port: parseInt(process.env.DB_PORT, 10), //optional
    options: { //optional
        encrypt: true,  // Set to true for Azure SQL, false for others
        trustServerCertificate: true,  // Change to false if using a trusted certificate
    },
};

let pool;  // This will hold the database connection pool

// Function to connect to the database
const connectDB = async () => {
    try {
        if (!pool) {
            pool = await sql.connect(config);
            console.log("✅ Connected to Database");
        }
        return pool;
    } catch (error) {
        console.error("❌ Error connecting to the database:", error.message);
        throw error;  // Ensure the error is propagated
    }
};

// Function to close the database connection when the app terminates
const closeDB = async () => {
    try {
        if (pool) {
            await pool.close();  // Close the pool gracefully
            console.log("Database connection closed.");
        }
    } catch (error) {
        console.error("Error closing the database connection:", error.message);
    }
};

// Handle process termination
process.on("SIGINT", async () => {// when ctr+c is pressed
    await closeDB();  // Ensure the connection is closed when app is terminated
    process.exit();
});

module.exports = { connectDB, sql, closeDB };
