const Job = require("./job.model");
const { extractJobSkillsFromDescription } = require("./job.matcher");
const createJob = async (data, userId) => {
  return Job.create({
    ...data,
    createdBy: userId
  });
};



const createJobFromDescription = async (data, userId) => {
  const extractedSkills =
    extractJobSkillsFromDescription(data.description);

  return Job.create({
    title: data.title,
    requiredSkills: extractedSkills,
    createdBy: userId
  });
};

module.exports = {
  createJob,
  createJobFromDescription
};


