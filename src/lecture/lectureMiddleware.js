const Joi = require("joi");
const { BadRequestError } = require("../common/helpers/api-error");

const validateLecture = (req, res, next) => {
  const lecture = req.body;

  const schema = Joi.object({
    theme: Joi.string().min(3).max(120).required(),
    begin_date_time: Joi.date().required(),
    panelist_id: Joi.number().positive().min(1).required(),
    event_id: Joi.number().positive().min(1).required(),
  });

  const { error } = schema.validate(lecture);

  if (error) throw new BadRequestError(error.details[0].message);

  next();
};

module.exports = validateLecture;
