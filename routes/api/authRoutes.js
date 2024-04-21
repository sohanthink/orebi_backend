const express = require("express");
const router = express.Router();
const registrationController = require("../../controller/registrationController");
const otpVerifyController = require("../../controller/otpVerifyController");
const loginController = require("../../controller/loginController");
const otpValidationController = require("../../controller/otpValidationController");

router.post("/registration", registrationController);
router.post("/otpverify", otpVerifyController);
router.get("/otpverify/:email", otpValidationController);

router.post("/login", loginController);

module.exports = router;
