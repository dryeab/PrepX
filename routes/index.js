const authRoutes = require("./auth");

const router = require("express").Router();

router.use("", authRoutes);

module.exports = router;
