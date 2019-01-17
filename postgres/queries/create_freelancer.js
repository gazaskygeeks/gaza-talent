const knex = require("../knex.js");

module.exports = ({ airtableId, githubUsername, freelancerData }) =>
  knex("freelancers").insert({
    airtable_id: airtableId,
    github_username: githubUsername,
    profile_data: JSON.stringify(freelancerData)
  });
