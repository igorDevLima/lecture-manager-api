const Joi = require("joi");
const { BadRequestError } = require("../common/helpers/api-error");

const validatePanelist = (req, res, next) => {
  const panelist = req.body;

  const schema = Joi.object({
    first_name: Joi.string().min(2).max(40).required(),
    last_name: Joi.string().min(2).max(40).required(),
    academic_degree: Joi.string().min(2).max(30),
  });

  const { error } = schema.validate(panelist);

  if (error) throw new BadRequestError(error.details[0].message);

  next();
};

module.exports = validatePanelist;
