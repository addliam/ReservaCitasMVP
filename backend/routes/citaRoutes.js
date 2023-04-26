const express = require("express");
const router = express.Router();
const citaController = require("../controllers/citaController");

router.get("/", citaController.getTodasCitas);

module.exports = router;
