const airtable = require("airtable");

const peopleTableName = "Freelancers Cohort 4 & 5 Availability";
const profilesTableName = "Talent Profiles";

const base = airtable.base(process.env.AIRTABLE_BASE_ID);

const getUserFromGithubUsername = ghUsername => {
  records = [];
  return new Promise((resolve, reject) => {
    base(profilesTableName)
      .select({
        filterByFormula: "{Github Username}=ghUsername"
      })
      .eachPage(
        (pageRecords, getNextPage) => {
          records.push(pageRecords);
        },
        err => {
          if (err) return reject(err);

          resolve(records[0]);
        }
      );
  });
};

const userExists = (ghUsername, cb) => {
  let count = 0;
  return new Promise((resolve, reject) => {
    base(profilesTableName)
      .select({
        filterByFormula: "{Github Username}=ghUsername"
      })
      .eachPage(
        (pageRecords, getNextPage) => {
          count += pageRecords.length;
        },
        err => {
          if (err) return reject(err);

          resolve(count >= 0);
        }
      );
  });
};

const getAll = (tableName, cb) => {
  const records = [];

  return new Promise((resolve, reject) => {
    base(tableName)
      .select({
        view: "Grid view"
      })
      .eachPage(
        (pageRecords, getNextPage) => {
          pageRecords.forEach(record => {
            records.push(record);
          });

          getNextPage();
        },
        err => {
          if (err) return reject(err);

          resolve(records);
        }
      );
  });
};

const getAllPeople = cb => getAll(peopleTableName, cb);

const getAllProfiles = cb => getAll(profilesTableName, cb);

module.exports = {
  base,
  getAll,
  getAllPeople,
  getAllProfiles,
  userExists,
  getUserFromGithubUsername
};
