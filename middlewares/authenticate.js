const jwt = require("jsonwebtoken");
const { FORBIDDEN } = require("../utils/statusCodes");

const authenticate = async (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
        next();
      }
    });
  }

  if (req.user) {
    return true;
  } else {
    res.status(FORBIDDEN).send("You are not Authenticated");
    return false;
  }
};

module.exports = authenticate;
