const SKILL_DICTIONARY = {
  javascript: ["javascript", "js", "node"],
  python: ["python"],
  react: ["react", "reactjs"],
  nodejs: ["node", "nodejs", "express"],
  mongodb: ["mongo", "mongodb"],
  sql: ["sql", "mysql", "postgres"],
  java: ["java"],
  cpp: ["c++"],
  machinelearning: ["machine learning", "ml"],
  nlp: ["nlp", "natural language processing"]
};
const extractSkillsFromText = (text) => {
  const foundSkills = new Set();
  const lowerText = text.toLowerCase();

  for (const [skill, keywords] of Object.entries(SKILL_DICTIONARY)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        foundSkills.add(skill);
        break;
      }
    }
  }

  return Array.from(foundSkills);
};

module.exports = { extractSkillsFromText };
