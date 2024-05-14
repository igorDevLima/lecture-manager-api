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


app.use("/location", locationRouter);

// -----------------------------------------------------

module.exports = app;
