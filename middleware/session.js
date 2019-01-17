const wrapAsync = require("../lib/wrap_async.js");
const jwt = require("jsonwebtoken");

const sessionMiddleware = wrapAsync(async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    let tokenPayload;
    try {
      tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      console.error(e);
    }

    req.session = tokenPayload;
  }

  next();
});

module.exports = sessionMiddleware;
