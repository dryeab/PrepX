const { Contributor, Admin } = require("../../models");
const {
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  generateToken,
} = require("../../utils");

const router = require("express").Router();

//#region contributor
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
//#endregion contributor

//#region admin
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
//#endregion admin

module.exports = router;
