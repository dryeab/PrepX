const authRoutes = require("./auth");
const contriburorRoutes = require("./contributor");
const adminRoutes = require("./admin");
const questionRoutes = require("./question");

const router = require("express").Router();

router.use("", authRoutes);
router.use("", contriburorRoutes);
router.use("", adminRoutes);
router.use("", questionRoutes);

module.exports = router;
