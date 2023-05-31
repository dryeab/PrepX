const { mongoose } = require("../config");
const Joi = require("joi");
const { capitalize, codeGenerator } = require("../utils");
const Subject = require("./Subject");

// Validation for Admin model
const adminJoi = Joi.object({
  firstName: Joi.string().required().min(1).max(40),
  lastName: Joi.string().required().min(1).max(40),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  status: Joi.string().required().min(1),
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
    .external(async (value, helper) => {
      if (value.length == 0) {
        return helper.message("Subjects must have at least one element");
      }
      for (let i = 0; i < value.length; i++) {
        const subject = await Subject.findOne({ code: value[i] });
        if (!subject)
          return helper.message(`Subject with code ${value[i]} doesn't exist`);
      }
      return value;
    }),
});

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
  subjects: {
    required: true,
    type: [
      {
        type: Number,
        ref: "subject",
      },
    ],
  },
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

adminSchema.statics.validate = async (admin) =>
  await adminJoi.validateAsync(admin);

adminSchema.methods.toJSON = function () {
  const {
    updatedAt,
    createdAt,
    password,
    verificationCode,
    emailVerified,
    __v,
    ...result
  } = this.toObject();
  return result;
};

adminSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("admin", adminSchema);
