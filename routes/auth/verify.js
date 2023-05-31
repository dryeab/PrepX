const { Contributor, Admin } = require("../../models");
const { generateToken } = require("../../utils");
const { BAD_REQUEST, UNAUTHORIZED } = require("../../utils").statusCodes;

const router = require("express").Router();

router.post("/contributor", async (req, res) => {
  var { email, code } = req.body;

  if (!code) {
    return res.status(BAD_REQUEST).send("Code not found");
  }

  var contributor = await Contributor.findOne({
    email: email,
    emailVerified: false,
    verificationCode: code,
  });

  if (!contributor) {
    return res.status(UNAUTHORIZED).send("Invalid credentials");
  }

  contributor.emailVerified = true;
  contributor.save();

  res.send({
    token: generateToken({ email: contributor.email, role: "contributor" }),
  });
});

router.post("/admin", async (req, res) => {
  var { email, code } = req.body;

  if (!code) {
    return res.status(BAD_REQUEST).send("Code not found");
  }

  var admin = await Admin.findOne({
    email: email,
    emailVerified: false,
    verificationCode: code,
  });

  if (!admin) {
    return res.status(UNAUTHORIZED).send("Invalid credentials");
  }

  admin.emailVerified = true;
  admin.save();

  res.send({
    token: generateToken({ email: admin.email, role: "admin" }),
  });
});

module.exports = router;
