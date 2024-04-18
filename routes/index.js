const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");

const api = process.env.BASE_URL; // api/v1

router.use(api, apiRoutes);

// if someone enter any unknown api link
router.use(api, (req, res) => res.json("No api founds on thisn route"));

module.exports = router;
