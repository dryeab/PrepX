const { authorize } = require("../../middlewares");
const { Contributor } = require("../../models");

const approveRoutes = require("./approve");

const router = require("express").Router();

router.use("/contributors", approveRoutes);

// get the list of Contributors
router.get("/contributors", authorize("admin"), async (req, res) => {
  const { approved } = req.query;

  var contriburors = [];
  if (approved == "true" || approved == "false") {
    contriburors = await Contributor.find({
      approved: approved == "true",
      emailVerified: true,
    }).exec();
  } else {
    contriburors = await Contributor.find({ emailVerified: true }).exec();
  }

  return res.json(contriburors.map((contriburor) => contriburor.toJSON()));
});

module.exports = router;
