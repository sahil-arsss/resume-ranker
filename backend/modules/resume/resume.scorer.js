const scoreResume = (resumeSkills, jobSkills) => {
  let score = 0;
  let maxScore = 0;
  const matchedSkills = [];

  for (const jobSkill of jobSkills) {
    maxScore += jobSkill.weight;

    if (resumeSkills.includes(jobSkill.skill)) {
      score += jobSkill.weight;
      matchedSkills.push(jobSkill.skill);
    }
  }

  const finalScore =
    maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);

  return {
    score: finalScore,
    matchedSkills
  };
};

module.exports = { scoreResume };
