const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().required().min(1).max(20),
  lastName: Joi.string().required().min(1).max(20),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  status: Joi.string().required(),
  cgpa: Joi.number().required().min(0).max(5),
  field: Joi.string().required(),
  college: Joi.string().required(),
  passport: Joi.required(),
  cv: Joi.required(),
  photo: Joi.required(),
});

module.exports = schema;
