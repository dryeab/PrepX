const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING);

module.exports = mongoose;
