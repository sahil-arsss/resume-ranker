const shortlistedTemplate = (name, score) => `
  <h2>Congratulations ${name}!</h2>
  <p>You have been shortlisted with a score of <b>${score}%</b>.</p>
`;

const rejectedTemplate = (name) => `
  <h2>Hello ${name}</h2>
  <p>Thank you for applying. We encourage you to apply again in the future.</p>
`;

module.exports = {
  shortlistedTemplate,
  rejectedTemplate
};
