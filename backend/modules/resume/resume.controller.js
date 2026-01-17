const resumeService = require("./resume.service");

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
     const { candidateEmail } = req.body;
    if (!candidateEmail) {
        return res.status(400).json({ message: "Candidate email is required" });
      }
    const resume = await resumeService.saveResumeMetadata(
      req.file,
      req.user.id,
      candidateEmail
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
const rankResumes = async (req, res, next) => {
  try {
    const ranked = await resumeService.rankResumesForJob(
      req.params.jobId
    );

    res.json({
      success: true,
      rankedCandidates: ranked
    });
  } catch (err) {
    next(err);
  }
};
const notifyCandidate = async (req, res, next) => {
  try {
    await resumeService.notifyCandidate(req.params.id);

    res.json({
      success: true,
      message: "Email sent successfully"
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadResume,extractResumeText,extractResumeSkills,scoreResume,rankResumes,notifyCandidate };
