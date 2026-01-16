const Resume = require("./resume.model");
const { extractTextFromResume } = require("./resume.parser");

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


module.exports = { saveResumeMetadata,processResumeText };
