const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const employeesRoutes = require("./routes/employees");
const departmentsRoutes = require("./routes/departments");
const branchesRoutes = require("./routes/branches");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ Define Routes
app.use("/employees", employeesRoutes);
app.use("/departments", departmentsRoutes);
app.use("/branches", branchesRoutes);

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
