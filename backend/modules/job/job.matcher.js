const { extractSkillsFromText } = require("../resume/skill.extractor");

const extractJobSkillsFromDescription = (description) => {
  const skills = extractSkillsFromText(description);

  return skills.map(skill => ({
    skill,
    weight: 1 // default weight
  }));
};

module.exports = { extractJobSkillsFromDescription };
