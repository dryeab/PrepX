const authRoutes = require("./auth");
const contriburorRoutes = require("./contributor");
const adminRoutes = require("./admin");
const questionRoutes = require("./question");
const subjectRoutes = require("./subject");

const router = require("express").Router();

router.use("", authRoutes);
router.use("", contriburorRoutes);
router.use("/admins", adminRoutes);
router.use("", questionRoutes);
router.use("", subjectRoutes);

module.exports = router;
