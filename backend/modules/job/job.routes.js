const express = require("express");
const router = express.Router();
const jobController=require("./job.controller");
const protect = require("../../middlewares/auth.middleware");
router.post("/",protect,jobController.createJob);

module.exports = router;