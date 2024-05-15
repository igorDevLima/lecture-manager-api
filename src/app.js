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

app.use("/location", locationRouter);
app.use("/event", eventRouter);

// -----------------------------------------------------

module.exports = app;
