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
  citaController.postCitaConMespFechaHora
);

router.get(
  "/paciente/historial",
  authJwtMiddleware,
  checkPaciente,
  citaController.getHistorialCitasPaciente
);
// TODO: URGENTE
// funcion que tome paraemtro medicoEspecialidad y numero de mes. ejemplo mayo 5, debe retornar un listado de las fechas y horas de las citas que ya estan OCUPADAS para que el frontend las renderice como rojo.
module.exports = router;
