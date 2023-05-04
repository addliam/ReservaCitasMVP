const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horarioController");

router.get("/", horarioController.getTodosHorarios);
// ver horarios disponibles para la especialidad Derma con el doctorid 4
// router.get("/disponible", horarioController.getHorarioDisponibleConFiltro);
module.exports = router;
