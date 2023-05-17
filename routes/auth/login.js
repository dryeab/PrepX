const { Contributor, Admin } = require("../../models");
const {
  encryptPassword,
  UNAUTHORIZED,
  BAD_REQUEST,
  generateToken,
} = require("../../utils");
const bcrypt = require("bcrypt");

const router = require("express").Router();

//#region contributor
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

//#endregion contributor

//#region admin
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
//#endregion admin

//#region superadmin
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
//#endregion superadmin
