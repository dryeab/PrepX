const mongoose = require("mongoose");
const Joi = require("joi");

// Validation
const questionJoi = Joi.object({
  q: Joi.string().required().min(1),
  choices: Joi.array().items(Joi.required()).min(2).required(),
  answer: Joi.string().required().min(1),
  description: Joi.string().min(1),
});

questionSchema = mongoose.Schema({
  q: {
    required: true,
    type: String,
  },
  choices: {
    required: true,
    type: [
      {
        letter: {
          type: String,
          required: true,
        },
        text: {
          required: true,
          type: String,
        },
      },
    ],
  },
  answer: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
});

questionSchema.statics.validate = (question) => questionJoi.validate(question);

questionSchema.methods.toJSON = function () {
  const { updatedAt, createdAt, ...result } = this.toObject();
  return result;
};

questionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Question", questionSchema);
