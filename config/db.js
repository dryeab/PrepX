const mongoose = require("mongoose");

const config = () => mongoose.connect(process.env.CONNECTION_STRING);

module.exports = config;