const express = require("express");
const router = express.Router();

const registrationController = require("../../controller/registrationController");
const otpVerifyController = require("../../controller/otpVerifyController");
const loginController = require("../../controller/loginController");
const otpValidationController = require("../../controller/otpValidationController");
const forgotPasswordController = require("../../controller/forgotPasswordController");
const changePassword = require("../../controller/changePassword");

// all the login and registration routes

router.post("/registration", registrationController);
router.post("/otpverify", otpVerifyController);
router.get("/otpverify/:email", otpValidationController);

router.post("/login", loginController);

router.post("/forgotpassword", forgotPasswordController);
router.post("/changepassword", changePassword);

module.exports = router;
