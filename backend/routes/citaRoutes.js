const express = require("express");
const router = express.Router();
const citaController = require("../controllers/citaController");
const authJwtMiddleware = require("../middlewares/authJwtMiddleware");
const checkPaciente = require("../middlewares/paciente/checkPaciente");

router.get("/", citaController.getTodasCitas);
// @data  medicoEspecialidadId, fecha, hora
// FORMATO ("DD-MM-YYYY") ("HH:mm")
router.post(
  "/agendar",
  authJwtMiddleware,
  checkPaciente,
  citaController.postCitaNueva
);
module.exports = router;
