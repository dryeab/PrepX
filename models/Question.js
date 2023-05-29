const mongoose = require("mongoose");
const { questionJoi } = require("../validators");

const choiceSchema = mongoose.Schema({
  letter: {
    type: String,
    required: true,
  },
  text: {
    required: true,
    type: String,
  },
});

choiceSchema.methods.toJSON = function () {
  const { _id, ...result } = this.toObject();
  return result;
};

questionSchema = mongoose.Schema({
  q: {
    required: true,
    type: String,
  },
  choices: {
    required: true,
    type: [choiceSchema],
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
  result.choices = result.choices.map((choice) => {
    const { _id, ...choiceResult } = choice;
    return choiceResult;
  });
  return result;
};

questionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Question", questionSchema);
