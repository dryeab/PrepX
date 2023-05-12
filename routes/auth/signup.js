const { Contributor } = require("../../models");
const { upload } = require("../../middlewares");
const { sendMail } = require("../../utils");
const { BAD_REQUEST, CREATED } = require("../../utils");

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
      //TODO: delete uploaded files
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
    contributor.photo = req.files.photo;
    contributor.passport = req.files.passport;
    contributor.cv = req.files.cv;

    contributor
      .save()
      .then((saved) => {
        sendMail(saved.email, saved.verificationCode);
        res.status(CREATED).send("Email verification sent");
      })
      .catch((err) => res.status(500).send(err));
  }
);

//#endregion contributor

//#region admin
const adminSignup = (req, res) => {};
//#endregion admin

module.exports = router;
