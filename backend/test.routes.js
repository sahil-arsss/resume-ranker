const express = require("express");
const protect = require("./middlewares/auth.middleware");
const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

module.exports = router;
