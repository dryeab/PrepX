const mongoose = require("mongoose");

module.exports = mongoose.model(
  "student",
  mongoose.Schema({
    name: String,
    Age: String,
  })
);
