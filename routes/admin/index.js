const { authorize } = require("../../middlewares");
const { Admin } = require("../../models");

const approveRoutes = require("./approve");

const router = require("express").Router();

router.use("/admins", approveRoutes);

router.get("/admins", authorize("superadmin"), async (req, res) => {
  const { approved } = req.query;

  var admins = [];
  if (approved == "true") {
    admins = await Admin.find({ approved: true, emailVerified: true }).exec();
  } else {
    admins = await Admin.find({ emailVerified: true }).exec();
  }

  return res.json(admins.map((admin) => admin.toJSON()));
});

module.exports = router;
