const wrapAsync = require("../lib/wrap_async.js");
const jwt = require("jsonwebtoken");

const { accessToken, currentUser } = require("../lib/github.js");
const airtable = require("../lib/airtable.js");

const callback = wrapAsync(async (req, res) => {
  const userAccessToken = (await accessToken(req.query.code)).access_token;
  const userProfile = await currentUser(userAccessToken);
  const userExists = airtable.userExists(userProfile.login);

  if (!userExists) {
    return res.status(404).json({ error: "user does not exist" });
  }

  res.json({
    token: jwt.sign(
      {
        githubUsername: userProfile.login
      },
      process.env.JWT_SECRET
    )
  });
});

module.exports = {
  callback
};
