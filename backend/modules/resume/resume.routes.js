const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/auth.middleware");
const upload = require("../../utils/fileUpload");
const resumeController = require("./resume.controller");

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  resumeController.uploadResume
);
router.post(
  "/:id/extract-text",
  protect,
  resumeController.extractResumeText
);
router.post(
  "/:id/extract-skills",
  protect,
  resumeController.extractResumeSkills
);


module.exports = router;
