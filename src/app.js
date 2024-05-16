const express = require("express");
require("express-async-errors");
const app = express();
app.use(express.json());

/*
------------------
  routes
------------------
*/

const locationRouter = require("./location/location");
const eventRouter = require("./event/event");
const panelistRouter = require("./panelist/panelist");

app.use("/location", locationRouter);
app.use("/event", eventRouter);
app.use("/panelist", panelistRouter);

// -----------------------------------------------------

module.exports = app;
