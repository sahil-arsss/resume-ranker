const Resume = require("./resume.model");
const { extractTextFromResume } = require("./resume.parser");
const { extractSkillsFromText } = require("./skill.extractor");
const Job = require("../job/job.model");
const { scoreResume } = require("./resume.scorer");
const { sendEmail } = require("../../utils/email/email.service");
const {
  shortlistedTemplate,
  rejectedTemplate
} = require("../../utils/email/email.templates");


const saveResumeMetadata = async (file, userId,candidateEmail) => {
  const resume = await Resume.create({
    originalName: file.originalname,
    filePath: file.path,
    fileType: file.mimetype,
    uploadedBy: userId,
    candidateEmail, 
  });
  return resume;
};
const processResumeText = async (resumeId) => {
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume not found");

  const text = await extractTextFromResume(
    resume.filePath,
    resume.fileType
  );

  resume.extractedText = text;
  resume.status = "TEXT_EXTRACTED";
  await resume.save();

  return resume;
};

const extractResumeSkills = async (resumeId) => {
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume not found");
  if (!resume.extractedText)
    throw new Error("Text not extracted yet");

  const skills = extractSkillsFromText(resume.extractedText);

  resume.skills = skills;
  resume.status = "SKILLS_EXTRACTED";
  await resume.save();

  return resume;
};

const scoreResumeForJob = async (resumeId, jobId) => {
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume not found");

  if (!resume.skills || resume.skills.length === 0)
    throw new Error("Skills not extracted");

  const job = await Job.findById(jobId);
  if (!job) throw new Error("Job not found");

  const result = scoreResume(resume.skills, job.requiredSkills);

  resume.score = result.score;
  resume.matchedSkills = result.matchedSkills;
  resume.jobApplied = jobId;
  resume.status = "PROCESSED";

  await resume.save();
  return resume;
};


const rankResumesForJob = async (jobId) => {
  const job = await Job.findById(jobId);
  if (!job) throw new Error("Job not found");

  const resumes = await Resume.find({
    skills: { $exists: true, $ne: [] }
  });

  const ranked = resumes.map(resume => {
    const result = scoreResume(
      resume.skills,
      job.requiredSkills
    );

    return {
      resumeId: resume._id,
      score: result.score,
      matchedSkills: result.matchedSkills
    };
  });  

  return ranked.sort((a, b) => b.score - a.score);
};


const notifyCandidate = async (resumeId) => {
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume not found");

  if (!resume.candidateEmail)
    throw new Error("Candidate email missing");

  let subject, html;

  if (resume.score >= 70) {
    subject = "You have been shortlisted!";
    html = shortlistedTemplate("Candidate", resume.score);
  } else {
    subject = "Application Update";
    html = rejectedTemplate("Candidate"); 
  }

  await sendEmail({
    to: resume.candidateEmail,
    subject,
    html
  });

  resume.emailStatus = "SENT";
  await resume.save();

  return resume;
};

const getResumeStats = async () => {
  const total = await Resume.countDocuments();
  const processed = await Resume.countDocuments({
    status: "PROCESSED"
  });
  const shortlisted = await Resume.countDocuments({
    score: { $gte: 70 }
  });
  const rejected = await Resume.countDocuments({
    score: { $lt: 70 }
  });

  return {
    total,
    processed,
    shortlisted,
    rejected
  };
};

module.exports = { saveResumeMetadata,processResumeText,extractResumeSkills ,scoreResumeForJob,rankResumesForJob,notifyCandidate,getResumeStats};
