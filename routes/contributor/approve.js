const { authorize } = require("../../middlewares");
const { Contributor } = require("../../models");
const { NOT_FOUND, SERVER_ERROR } = require("../../utils");

const router = require("express").Router();

router.put("/approve", authorize("admin"), async (req, res) => {
  const { email } = req.body;

  if (
    (await Contributor.find({ email: email, approved: false }).exec()).length
  ) {
    Contributor.findOneAndUpdate(
      { email: email },
      { approved: true },
      { new: true }
    )
      .then((newContributor) => res.json(newContributor))
      .catch((err) => res.status(SERVER_ERROR).send("Something went wrong"));
  } else {
    return res.status(NOT_FOUND).send("User not found");
  }
});

module.exports = router;
