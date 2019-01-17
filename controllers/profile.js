const { getAllPeople, getAllProfiles } = require("../lib/airtable");
const pg = require("../postgres");

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

const create = (req, res) => {
  const freelancerData = req.body;
  const { airtableId, githubUsername } = req.session;

  pg.createFreelancer({
    airtableId: "1",
    githubUsername,
    freelancerData
  })
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(e => {
      console.error(e);
      res.status("500").json({
        error: e
      });
    });
};

const getCurrent = (req, res) => {
  const { githubUsername } = req.session;

  pg.getFreelancer(githubUsername)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      console.error(e);
      res.status("500").json({
        error: e
      });
    });
};

const get = (req, res) => {
  const { githubUsername } = req.params;

  pg.getFreelancer(githubUsername)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      console.error(e);
      res.status("500").json({
        error: e
      });
    });
};

const update = (req, res) => {
  const freelancerData = req.body;
  const { githubUsername } = req.session;

  pg.updateFreelancer(githubUsername, freelancerData)
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(e => {
      console.error(e);
      res.status("500").json({
        error: e
      });
    });
};

const getAll = (req, res) => {
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
  create,
  update,
  getCurrent,
  get,
  getAll
};
