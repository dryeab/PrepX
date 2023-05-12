const { Contributor } = require("../../models");
const { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } = require("../../utils");

const router = require("express").Router();

// verify the verification code sent to a user
router.post("/verify", async (req, res) => {
  var { email, code } = req.body,
    role = req.query.role;

  if (!code) {
    return res.status(BAD_REQUEST).send("Code not found");
  }

  var User = null;
  switch (role && role.toLowerCase()) {
    case "contributor":
      User = Contributor;
      break;
    default:
      return res.status(NOT_FOUND).send("Role not found");
  }

  var user = await User.findOne({
    email: email,
    emailVerified: false,
    verificationCode: code,
  });

  if (!user) {
    return res.status(UNAUTHORIZED).send("Invalid credentials");
  }

  user.emailVerified = true;
  user.save();

  res.send({
    token: generateToken({ email: user.email, role: role.toLowerCase() }),
  });
});

module.exports = router;
