const Joi = require("joi");
const { BadRequestError } = require("../helpers/api-error");

const validateParamsID = (req, res, next) => {
  const param = req.params;

  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });

  const { error } = schema.validate(param);

  if (error) throw new BadRequestError(error.details[0].message);

  next();
};

module.exports = validateParamsID;
