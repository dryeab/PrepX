const Joi = require("joi");

const schema = Joi.object({
  q: Joi.string().required().min(1),
  choices: Joi.array().required(),
  answer: Joi.string().required().min(1),
  description: Joi.string().min(1),
});

module.exports = schema;
