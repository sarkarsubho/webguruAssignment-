// scripts/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../models/user.model.js");

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  if (await User.findOne({ email: "admin@example.com" })) {
    console.log("Admin already exists");
    return;
  }

  const admin = new User({
    name: "Super Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
    status: "active",
  });

  await admin.save();
  console.log("Admin created");
  process.exit();
};

createAdmin();
