const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware.js");

router.get("/getstatus", protect, (req, res) => {
  res.json({
    status: "active",
  });
});

module.exports = router;
