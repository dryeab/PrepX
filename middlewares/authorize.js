const { UNAUTHORIZED } = require("../utils/statusCodes");
const authenticate = require("./authenticate");

const authorize = (role) => async (req, res, next) => {
  if (await authenticate(req, res, () => true)) {
    if (req.user.role == role) {
      return next();
    }
    res.status(UNAUTHORIZED).send("You are not Authorized");
  }
};

module.exports = authorize;