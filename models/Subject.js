const { mongoose } = require("../config");
const { subjectJoi } = require("../validators");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
});

subjectSchema.statics.validate = (subject) => subjectJoi.validate(subject);

subjectSchema.methods.toJSON = function () {
  const { _id, __v, ...result } = this.toObject();
  return result;
};

module.exports = mongoose.model("subject", subjectSchema);
