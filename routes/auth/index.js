const signupRoutes = require("./signup");
const verifyRoutes = require("./verify");

const router = require("express").Router();

router.use("/signup", signupRoutes);
router.use("/verify", verifyRoutes);

module.exports = router;
