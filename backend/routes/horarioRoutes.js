const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horarioController");

router.get("/", horarioController.getTodosHorarios);

module.exports = router;
