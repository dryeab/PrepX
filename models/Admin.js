const { mongoose } = require("../config");
const Joi = require("joi");
const { capitalize, codeGenerator } = require("../utils");

//#region validation
const adminJoi = Joi.object({
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
  password: Joi.string().required(),
  subjects: Joi.array()
    .items(Joi.number().required())
    .required()
    .custom(async (value, helper) => {
      if (value.length == 0) {
        return helper.message("subjects must have at least one element");
      }
      for (x in value) {
        if (!(await Subject.findOne({ code: x })))
          return helper.message(`Subject with code ${code} doesn't exist`);
      }
      return true;
    }),
});
//#endregion validation

const adminSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    set: capitalize,
  },
  lastName: {
    type: String,
    required: true,
    set: capitalize,
  },
  email: {
    type: String,
    required: true,
    immutable: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["UNDERGRAD", "POSTGRAD"],
    required: true,
    uppercase: true,
  },
  cgpa: {
    type: Number,
    min: 0,
    required: true,
  },
  field: {
    type: String,
    required: true,
    uppercase: true,
  },
  college: {
    type: String,
    required: true,
    uppercase: true,
  },
  passport: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  cv: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: Number,
      ref: "subject",
    },
  ],
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationCode: {
    type: Number,
    default: codeGenerator,
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

adminSchema.statics.validate = (admin) => adminJoi.validate(admin);

adminSchema.methods.toJSON = function () {
  const {
    updatedAt,
    createdAt,
    password,
    verificationCode,
    emailVerified,
    ...result
  } = this.toObject();
  return result;
};

adminSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("admin", adminSchema);
