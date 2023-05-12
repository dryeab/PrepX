require("dotenv").config();
const dbConfig = require("./db");
const cloudinaryConfig = require("./cloudinary");

const config = () => {
  dbConfig();
  cloudinaryConfig();
};

module.exports = { config };
