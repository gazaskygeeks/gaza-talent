exports.up = function(knex, Promise) {
  return knex.schema.createTable("freelancers", table => {
    table.string("airtable_id", 35).primary();
    table.string("github_username");
    table.jsonb("profile_data");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("freelancers");
};
