const express = require("express");
const morgan = require("morgan");

require("env2")(".env"); // configure enviroment (in ./.env)

const sessionMiddleware = require("./middleware/session.js");

const githubController = require("./controllers/github.js");
const profileController = require("./controllers/profile.js");

// INIT

const app = express();

// MIDDLEWARE
app.use(morgan("tiny"));
app.use(sessionMiddleware);

// CLIENT
app.use(express.static("client/build"));

// API
const apiRouter = new express.Router();

apiRouter.get("/profile", profileController.getAll);
apiRouter.get("/github/callback", githubController.callback);

app.use("/api", apiRouter);

// Error MIDDLEWARE
app.use(function(req, res, next) {
  res.status(404);

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

// START
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
