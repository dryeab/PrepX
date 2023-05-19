const { authorize } = require("../../middlewares");
const { Admin } = require("../../models");
const { NOT_FOUND, SERVER_ERROR } = require("../../utils");

const router = require("express").Router();

router.put("/approve", authorize("superadmin"), async (req, res) => {
  const { email } = req.body;

  if ((await Admin.find({ email: email, approved: false }).exec()).length > 0) {
    Admin.findOneAndUpdate({ email: email }, { approved: true }, { new: true })
      .then((newAdmin) => res.json(newAdmin))
      .catch((err) => res.status(SERVER_ERROR).send("Something went wrong"));
  } else {
    return res.status(NOT_FOUND).send("User not found");
  }
});

module.exports = router;
