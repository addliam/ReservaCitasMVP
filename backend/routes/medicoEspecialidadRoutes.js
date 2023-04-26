const express = require("express");
const router = express.Router();
const medicoEspecialidadController = require("../controllers/medicoEspecialidadController");

router.get("/", medicoEspecialidadController.getTodosMedicoEspecialidad);
router.get("/pretty", medicoEspecialidadController.getTodosPretty);

module.exports = router;
