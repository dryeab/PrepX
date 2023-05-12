const jwt = require("jsonwebtoken");

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "30d",
  });

module.exports = generateToken;
