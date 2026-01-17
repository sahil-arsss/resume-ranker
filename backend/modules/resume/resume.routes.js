const express = require("express");
const router = express.Router();
const protect = require("../../middlewares/auth.middleware");
const upload = require("../../utils/fileUpload");
const resumeController = require("./resume.controller");
const allowRoles = require("../../middlewares/role.middleware");

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
router.post(
  "/:resumeId/score/:jobId",
  resumeController.scoreResume
);
router.get(
  "/rank/job/:jobId",
  protect,
  resumeController.rankResumes
);
router.post(
  "/:id/notify",
  protect,
  resumeController.notifyCandidate
);
router.get(
  "/stats",
  protect,
  allowRoles("ADMIN"),
  resumeController.getResumeStats
);
module.exports = router;
