const airtable = require("airtable");

const peopleTableName = "Freelancers Cohort 4 & 5 Availability";
const profilesTableName = "Talent Profiles";

const base = airtable.base(process.env.AIRTABLE_BASE_ID);

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
  getAllProfiles
};
