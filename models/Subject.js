const Joi = require("joi");
const { mongoose } = require("../config");

//#region validation
const subjectJoi = Joi.object({
  name: Joi.string().required(),
  code: Joi.number().required().min(0),
});
//#endregion validation

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
    },
  },
  { id: false }
);

subjectSchema.statics.validate = (subject) => subjectJoi.validate(subject);

subjectSchema.methods.toJSON = function () {
  const { _id, __v, ...result } = this.toObject();
  return result;
};

module.exports = mongoose.model("subject", subjectSchema);
