const capitalize = require("./capitalize");
const codeGenerator = require("./codeGenerator");
const generateToken = require("./generateToken");
const isImage = require("./isImage");
const sendMail = require("./sendMail");
const statusCodes = require("./statusCodes");

module.exports = {
  capitalize,
  codeGenerator,
  generateToken,
  isImage,
  sendMail,
  ...statusCodes,
};
