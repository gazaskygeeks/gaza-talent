const { getAllPeople, getAllProfiles } = require("../lib/airtable");

const binAndMerge = (getKey, records) => {
  const out = {};

  records.forEach(record => {
    const key = getKey(record);
    const old = out[key];

    if (old === undefined) {
      out[key] = record;
    } else {
      Object.assign(old.fields, record.fields);
    }
  });

  return out;
};

const getAll = (req, res) => {
  console.log("Getting profiles", { session: req.session });
  Promise.all([getAllPeople(), getAllProfiles()])
    .then(([personList, profileList]) => {
      return {
        people: binAndMerge(record => record.id, personList),
        profiles: binAndMerge(
          record => record.fields["Profile Name"][0],
          profileList
        )
      };
    })
    .then(({ people, profiles }) => {
      Object.keys(profiles).forEach(name => {
        people[name].fields;
        if (people[name]) {
          Object.assign(people[name].fields, profiles[name].fields);
        }
      });

      return Object.keys(people).map(name => people[name]);
    })
    .then(peopleListHydrated => {
      res.json(peopleListHydrated);
    })
    .catch(err => {
      console.error(err);

      res.status(500).send("something is not working. Sorry :(");
    });
};

module.exports = {
  getAll
};
