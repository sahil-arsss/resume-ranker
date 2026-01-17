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
const getJobStats = async () => {
  return Job.aggregate([
    {
      $lookup: {
        from: "resumes",
        localField: "_id",
        foreignField: "jobApplied",
        as: "applications"
      }
    },
    {
      $project: {
        title: 1,
        applicantsCount: { $size: "$applications" }
      }
    },
    {
      $sort: { applicantsCount: -1 }
    }
  ]);
};

module.exports = {
  createJob,
  createJobFromDescription,
  getJobStats
};


