const express = require("express");
const router = express.Router();
const RegistroPacienteController = require("../controllers/registroPacienteController");

router.get("/", RegistroPacienteController.getTodosRegistrosPaciente);

module.exports = router;
