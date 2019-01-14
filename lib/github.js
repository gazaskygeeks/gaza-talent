const request = require("request-promise-native");

const accessToken = async code => {
  console.log({ code });
  return request.post({
    url: "https://github.com/login/oauth/access_token",
    json: true,
    body: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    }
  });
};

const currentUser = async accessToken =>
  await request.get({
    url: "https://api.github.com/user",
    json: true,
    headers: {
      Authorization: `token ${accessToken}`,
      "User-Agent": "Gaza Sky Geeks Talent"
    }
  });

module.exports = {
  accessToken,
  currentUser
};
