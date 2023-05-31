const bcrypt = require("bcrypt");
const { Contributor, Admin } = require("../../models");
const { generateToken } = require("../../utils");
const { UNAUTHORIZED, BAD_REQUEST } = require("../../utils").statusCodes;

const router = require("express").Router();

router.post("/contributor", async (req, res) => {
  var { email, password } = req.body;

  var contributor = await Contributor.findOne({
    email: email,
    emailVerified: true,
  });

  if (!contributor) {
    return res.status(BAD_REQUEST).send("Email not found");
  } else if (!password || typeof password != "string") {
    return res.status(BAD_REQUEST).send("Password not found");
  }

  const matched = await bcrypt.compare(password, contributor.password);

  if (!matched) {
    return res.status(UNAUTHORIZED).send("Invalid credentials");
  }

  res.send({
    token: generateToken({ email: email, role: "contributor" }),
  });
});

router.post("/admin", async (req, res) => {
  var { email, password } = req.body;

  var admin = await Admin.findOne({ email: email, emailVerified: true });

  if (!admin) {
    return res.status(BAD_REQUEST).send("Email not found");
  } else if (!password || typeof password != "string") {
    return res.status(BAD_REQUEST).send("Password not found");
  }

  const matched = await bcrypt.compare(password, admin.password);

  if (!matched) {
    return res.status(UNAUTHORIZED).send("Invalid credentials");
  }

  res.send({
    token: generateToken({ email: email, role: "admin" }),
  });
});

router.post("/superadmin", async (req, res) => {
  var { email, password } = req.body;

  if (
    email == process.env.SUPER_ADMIN_EMAIL &&
    password == process.env.SUPER_ADMIN_PASSWORD
  ) {
    return res.send({
      token: generateToken({ email: email, role: "superadmin" }),
    });
  }
  return res.status(UNAUTHORIZED).send("Invalid credentials");
});

module.exports = router;
