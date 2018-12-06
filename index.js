const express = require("express");
const morgan = require("morgan");

// INIT
require("env2")(".env"); // configure enviroment (in ./.env)

const app = express();

// MIDDLEWARE
app.use(morgan("tiny"));

// CLIENT
app.use(express.static("client/build"));

// API
const apiRouter = new express.Router();

apiRouter.get("/talent", require("./controllers/getTalent.js"));

app.use("/api", apiRouter);

// START
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
