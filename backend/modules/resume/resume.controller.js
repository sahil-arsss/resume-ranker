const resumeService = require("./resume.service");

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const resume = await resumeService.saveResumeMetadata(
      req.file,
      req.user.id
    );

    res.status(201).json({
      success: true,
      resume
    });
  } catch (err) {
    next(err);
  }
};
const extractResumeText = async (req, res, next) => {
 
  try {
    const resume = await resumeService.processResumeText(
      req.params.id
    );

    res.json({
      success: true,
      status: resume.status
    });
  } catch (err) {
    next(err);
  }
};
const extractResumeSkills = async (req, res, next) => {
  try {
    const resume = await resumeService.extractResumeSkills(
      req.params.id
    );

    res.json({
      success: true,
      skills: resume.skills
    });
  } catch (err) {
    next(err);
  }
};
const scoreResume = async (req, res, next) => {
  try {
    const resume = await resumeService.scoreResumeForJob(
      req.params.resumeId,
      req.params.jobId
    );

    res.json({
      success: true,
      score: resume.score,
      matchedSkills: resume.matchedSkills
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadResume,extractResumeText,extractResumeSkills,scoreResume };
