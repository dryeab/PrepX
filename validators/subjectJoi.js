const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required().min(1),
  code: Joi.number().required().min(0),
});

module.exports = schema;
