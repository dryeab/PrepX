const mongoose = require("mongoose");
const Joi = require("joi");

// Validation
const questionJoi = Joi.object({
  q: Joi.string().required().min(1),
  choices: Joi.array().items(Joi.required()).min(2).required(),
  answer: Joi.string().required().min(1),
  description: Joi.string().min(1).required(),
  subject: Joi.number().required(),
  chapter: Joi.number().required(),
  section: Joi.number().required(),
  subsection: Joi.number().required(),
});

questionSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
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
  },
  derived: {
    type: Boolean,
    immutable: true,
    required: true,
  },
  original: {
    type: mongoose.Types.ObjectId,
    immutable: true,
  },
  subject: {
    type: Number,
    required: true,
    immutable: true,
  },
  chapter: {
    type: Number,
    required: true,
    immutable: true,
  },
  section: {
    type: Number,
    required: true,
    immutable: true,
  },
  subsection: {
    type: Number,
    required: true,
    immutable: true,
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
  const { updatedAt, createdAt, __v, ...result } = this.toObject();
  for (let i = 0; i < result.choices.length; ++i) {
    const { _id, ...choice } = result.choices[i];
    result.choices[i] = choice;
  }
  return result;
};

questionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Question", questionSchema);
