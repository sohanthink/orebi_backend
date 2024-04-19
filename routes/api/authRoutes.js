const express = require("express");
const router = express.Router();
const registrationController = require("../../controller/registrationController");
const otpVerifyController = require("../../controller/otpVerifyController");
const loginController = require("../../controller/loginController");

router.post("/registration", registrationController);
router.post("/otpverify", otpVerifyController);
router.post("/login", loginController);

module.exports = router;
