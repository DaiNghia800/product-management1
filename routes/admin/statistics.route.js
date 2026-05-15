const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/statistics.controller");

router.get("/viewer", controller.viewer);

module.exports = router;