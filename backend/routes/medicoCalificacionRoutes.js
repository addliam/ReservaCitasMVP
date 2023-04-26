const express = require("express");
const router = express.Router();
const medicoCalificacionController = require("../controllers/medicoCalificacionController");

router.get("/", medicoCalificacionController.getTodasMedicoCalificacion);

module.exports = router;
