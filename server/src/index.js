const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const { connect } = require("./config/db.js");
const requestChecker = require("./middlewares/requestChacker");

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestChecker);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("server is running...");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  // Connect MongoDB
  await connect();
  console.log(`Server running on port ${PORT}`);
});
