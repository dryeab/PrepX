const mongoose = require("mongoose");

module.exports = mongoose.model(
  "SuperAdmin",
  mongoose.Schema({
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  })
);
