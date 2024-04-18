const express = require("express");
const router = express.Router();
const registrationController = require("../../controller/registrationController");

router.post("/registration", registrationController);

module.exports = router;
