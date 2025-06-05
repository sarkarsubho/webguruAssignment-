const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");
const {
  getAllUsers,
  changeUserStatus,
  promoteToAdmin,
} = require("../controllers/admin.controller.js");
const {
  seedTasks,
  getTasks,
  bulkUpdateStatus,
} = require("../controllers/task.controller.js");

// User Management Routes
router.get("/users", protect, isAdmin, getAllUsers);
router.put("/users/status", protect, isAdmin, changeUserStatus);
router.put("/users/promote_to_admin", protect, isAdmin, promoteToAdmin);

// Task Management Routes
router.post("/tasks/seed", protect, isAdmin, seedTasks);
router.get("/tasks", protect, isAdmin, getTasks);
router.put("/tasks/bulk_update", protect, isAdmin, bulkUpdateStatus);
router.get("/getstatus", protect, isAdmin, (req, res) => {
  res.json({
    status: "active",
  });
});

module.exports = router;
