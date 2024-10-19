const express = require('express');
require('express-async-errors');
const app = express();
app.use(express.json());

/*
------------------
  routes
------------------
*/

const locationRouter = require('./location/location');
const eventRouter = require('./event/event');
const panelistRouter = require('./panelist/panelist');
const lectureRouter = require('./lecture/lecture');
const { errorMiddleware } = require('./common/middlewares/error');

app.use('/location', locationRouter);
app.use('/event', eventRouter);
app.use('/panelist', panelistRouter);
app.use('/lecture', lectureRouter);

// -----------------------------------------------------

app.use(errorMiddleware);

module.exports = app;
