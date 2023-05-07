const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  CGPA: {
    type: Number,
    required: true,
  },
  Field: {
    type: String,
    required: true,
  },
  College: {
    type: String,
    required: true,
  },
  Passport: {
    type: String,
    required: true,
  },
  Photo: {
    type: String,
    required: true,
  },
  Approved: {
    type: Boolean,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
