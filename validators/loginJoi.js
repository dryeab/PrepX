const joi = require("joi");

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(6).max(50),
});

module.exports = schema;
