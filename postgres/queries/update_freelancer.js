const knex = require("../knex.js");

module.exports = (githubUsername, freelancerData) =>
  knex("freelancers")
    .update({
      profile_data: JSON.stringify(freelancerData)
    })
    .where({
      github_username: githubUsername
    });
