const express = require("express");
const authRoutes = require("./modules/auth/auth.routes");
const resumeRoutes = require("./modules/resume/resume.routes")
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", require("./test.routes"));
app.use("/api/resumes",resumeRoutes);
module.exports = app;
