const { mongoose } = require("../config");
const { capitalize } = require("../utils");
const { subjectJoi } = require("../validators");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    set: capitalize,
  },
  code: {
    type: Number,
    required: true,
  },
});

subjectSchema.statics.validate = (subject) => subjectJoi.validate(subject);

subjectSchema.methods.toJSON = function () {
  const { _id, ...result } = this.toObject();
  return result;
};

module.exports = mongoose.model("subject", subjectSchema);
