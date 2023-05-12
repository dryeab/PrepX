const Contributor = require("../../models/Contributor");
const router = require("express").Router();
const uploadFields = require("../../middlewares/multerUpload");
const sendMail = require("../../utils/sendMail");

const { BAD_REQUEST, CREATED } = require("../../utils/statusCodes");

//#region contributor
router.post(
  "/signup/contributor",
  uploadFields([
    { name: "photo", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  async (req, res) => {
    // validate if the provided infomation is correct
    var { error } = Contributor.validate({ ...req.body, ...req.files });

    if (error != null) {
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

//#region student
const studentSignup = (req, res) => {};
//#endregion student

module.exports = router;
