const router = require("express").Router();
const signupRoute = require("./signup");
const verifyRoute = require("./verify");
const loginRoute = require("./login");

router.use("/", signupRoute);
router.use("/", verifyRoute);
router.use("/", loginRoute);

module.exports = router;
