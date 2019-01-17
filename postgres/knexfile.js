// Update with your config settings.
require("env2")("../.env");

module.exports = {
  client: "postgresql",
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    tableName: "knex_migrations"
  }
};
