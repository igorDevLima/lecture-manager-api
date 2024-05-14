const Joi = require("joi");
const { BadRequestError } = require("../common/helpers/api-error");

const validateLocation = (req, res, next) => {
  const location = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(120).required(),
  });

  const { error } = schema.validate(location);

  if (error) throw new BadRequestError(error.details[0].message);

  next();
};

module.exports = validateLocation;
