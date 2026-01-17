const jobService = require("./job.service");

const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.body, req.user.id);
    res.status(201).json({ success: true, job });
  } catch (err) {
    next(err);
  }
};
const createJobFromDescription = async (req, res, next) => {
  try {
    const job = await jobService.createJobFromDescription(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      job
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createJob,createJobFromDescription };
