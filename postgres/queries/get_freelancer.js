const knex = require("../knex.js");

module.exports = githubUsername =>
  knex("freelancers")
    .select("profile_data")
    .where({ github_username: githubUsername })
    .then(results => results[0].profile_data);
