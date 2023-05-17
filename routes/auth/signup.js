const { Contributor, Admin } = require("../../models");
const { upload } = require("../../middlewares");
const {
  sendMail,
  CREATED,
  BAD_REQUEST,
  destroyFiles,
  encryptPassword,
} = require("../../utils");

const router = require("express").Router();

//#region contributor
router.post(
  "/contributor",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  async (req, res) => {
    // validate if the provided infomation is correct
    var { error } = Contributor.validate({ ...req.body, ...req.files });

    if (error != null) {
      destroyFiles(req.files); // destroy the uploaded files
      return res.status(BAD_REQUEST).send(error.message);
    }

    var exist = await Contributor.findOne({
      email: req.body.email,
      emailVerified: true,
    });

    if (exist) {
      return res.status(BAD_REQUEST).send("Email already exists");
    } else {
      await Contributor.deleteMany(
        Contributor.find({ email: req.body.email, emailVerified: false })
      );
    }

    var contributor = new Contributor(req.body);
    contributor.photo = req.files.photo[0].path;
    contributor.passport = req.files.passport[0].path;
    contributor.cv = req.files.cv[0].path;
    contributor.password = await encryptPassword(contributor.password);

    contributor
      .save()
      .then((saved) => {
        sendMail(saved.email, saved.verificationCode);
        res.status(CREATED).send(`Email verification sent to ${saved.email}`);
      })
      .catch((err) => res.status(500).send(err));
  }
);

//#endregion contributor

//#region admin
router.post(
  "/admin",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  async (req, res) => {
    // validate if the provided infomation is correct
    var { error } = Admin.validate({ ...req.body, ...req.files });

    if (error != null) {
      destroyFiles(req.files); // destroy the uploaded files
      return res.status(BAD_REQUEST).send(error.message);
    }

    var exist = await Admin.findOne({
      email: req.body.email,
      emailVerified: true,
    });

    if (exist) {
      return res.status(BAD_REQUEST).send("Email already exists");
    } else {
      await Admin.deleteMany(
        Admin.find({ email: req.body.email, emailVerified: false })
      );
    }

    var admin = new Admin(req.body);
    admin.photo = req.files.photo[0].path;
    admin.passport = req.files.passport[0].path;
    admin.cv = req.files.cv[0].path;
    admin.password = await encryptPassword(admin.password);

    admin
      .save()
      .then((saved) => {
        sendMail(saved.email, saved.verificationCode);
        res.status(CREATED).send(`Email verification sent to ${saved.email}`);
      })
      .catch((err) => res.status(500).send(err));
  }
);
//#endregion admin

module.exports = router;
