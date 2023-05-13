const signupRoutes = require("./signup");
const verifyRoutes = require("./verify");
const loginRoutes = require("./login");

const router = require("express").Router();

router.use("/signup", signupRoutes);
router.use("/verify", verifyRoutes);
router.use("/login", loginRoutes);

module.exports = router;
