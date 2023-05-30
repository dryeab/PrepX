const { authorize, authenticate } = require("../../middlewares");
const { Admin } = require("../../models");
const { NOT_FOUND, SERVER_ERROR } = require("../../utils");
const { mongoose } = require("../../config");

const router = require("express").Router();

router.get("", authorize("superadmin"), async (req, res) => {
  const { approved } = req.query;

  var admins = [];
  if (approved == "false") {
    admins = await Admin.find({ approved: false, emailVerified: true }).exec();
  } else {
    admins = await Admin.find({ emailVerified: true }).exec();
  }

  return res.json(admins);
});

router.get("/:id", authorize("admin"), async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const admin = await Admin.findById(id).exec();
    if (admin) {
      return res.json(admin);
    }
  }
  return res.status(NOT_FOUND).send("Admin not found");
});

router.get("/approve/:id", authorize("superadmin"), async (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const admin = await Admin.findById(id).exec();
    if (admin) {
      admin.approved = true;
      return admin
        .save()
        .then((newAdmin) => res.json(newAdmin))
        .catch((err) => res.status(SERVER_ERROR).send("Something went wrong"));
    }
  }

  return res.status(NOT_FOUND).send("User not found");
});

module.exports = router;
