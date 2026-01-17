const express = require("express");
const router = express.Router();
const jobController=require("./job.controller");
const protect = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");
router.post("/",protect,jobController.createJob);
router.post(
  "/from-description",
  protect,
  jobController.createJobFromDescription
);
router.get(
  "/stats",
  protect,
  allowRoles("ADMIN"),
  jobController.getJobStats
);

module.exports = router;  