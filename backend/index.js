const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth.js"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
