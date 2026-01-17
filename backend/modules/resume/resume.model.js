const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    originalName: String,
    filePath: String,
    fileType: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    extractedText: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    score: {
      type: Number,
      default: 0,
    },
    matchedSkills: {
      type: [String],
      default: [],
    },
    jobApplied: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    status: {
      type: String,
      enum: ["UPLOADED", "TEXT_EXTRACTED", "SKILLS_EXTRACTED", "PROCESSED"],
      default: "UPLOADED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
