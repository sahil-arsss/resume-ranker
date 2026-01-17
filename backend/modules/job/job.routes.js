const express = require("express");
const router = express.Router();
const jobController=require("./job.controller");
const protect = require("../../middlewares/auth.middleware");
router.post("/",protect,jobController.createJob);
router.post(
  "/from-description",
  protect,
  jobController.createJobFromDescription
);

module.exports = router;