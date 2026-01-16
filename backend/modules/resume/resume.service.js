const Resume = require("./resume.model");
const { extractTextFromResume } = require("./resume.parser");
const { extractSkillsFromText } = require("./skill.extractor");

const saveResumeMetadata = async (file, userId) => {
  const resume = await Resume.create({
    originalName: file.originalname,
    filePath: file.path,
    fileType: file.mimetype,
    uploadedBy: userId
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

module.exports = { saveResumeMetadata,processResumeText,extractResumeSkills };
