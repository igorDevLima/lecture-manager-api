const Joi = require('joi');
const { BadRequestError } = require('../common/helpers/api-error');
const { beginDateIsEarlierEndDates } = require('../common/helpers/functions');

const validateEvent = (req, res, next) => {
  const location = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(120).required(),
    begin_date_time: Joi.date().required(),
    end_date_time: Joi.date().required(),
    location: Joi.string().min(3).max(120),
  });

  const { error } = schema.validate(location);

  if (error) throw new BadRequestError(error.details[0].message);

  if (
    !beginDateIsEarlierEndDates(
      location.begin_date_time,
      location.end_date_time,
    )
  )
    throw new BadRequestError(
      'The start date should be earlier than the end date.',
    );

  next();
};

module.exports = validateEvent;
