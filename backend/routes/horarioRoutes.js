const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horarioController");

router.get("/", horarioController.getTodosHorarios);
// ver horarios disponibles para la especialidad Derma con el doctorid 4
// router.get("/disponible", horarioController.getHorarioDisponibleConFiltro);

// TODO realizar una ruta que pueda ver los horario de la semana en base a medicoEspecialidadId, el frontend ya lo tiene desde /hospital/[slug] es facil acceso
// Quiero los horarios en este formato
// donde x = {"horaInicio":"08:00:00","horaFin":"08:30:00","ocupado":false}
// Formato [{"1":[{x},{x},{x}],"2":[{x},{x},{x}]}]
// id es medicoEspecialidadId el par [medico, especialidad]
router.get(
  "/medico-especialidad/:id",
  horarioController.getHorarioPorMedicoEspecialidadId
);
module.exports = router;
