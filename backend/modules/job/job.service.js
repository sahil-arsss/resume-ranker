const Job = require("./job.model");

const createJob = async (data, userId) => {
  return Job.create({
    ...data,
    createdBy: userId
  });
};

module.exports = { createJob };
