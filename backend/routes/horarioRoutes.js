const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horarioController");
const checkMedico = require("../middlewares/medico/checkMedico");
const authJwt = require("../middlewares/authJwtMiddleware");

router.get("/", horarioController.getTodosHorarios);

// TODO realizar una ruta que pueda ver los horario de la semana en base a medicoEspecialidadId, el frontend ya lo tiene desde /hospital/[slug] es facil acceso
// Quiero los horarios en este formato
// donde x = {"horaInicio":"08:00:00","horaFin":"08:30:00","ocupado":false}
// Formato [{"1":[{x},{x},{x}],"2":[{x},{x},{x}]}]
// id es medicoEspecialidadId el par [medico, especialidad]
router.get(
  "/medico-especialidad/:id",
  horarioController.getHorarioPorMedicoEspecialidadId
);
router.get(
  "/medico/especialidad/:id",
  horarioController.getHorarioDelMedicoPorEspecialidadId
);
// /horario/disponible
router.get(
  "/medico-especialidad/:id/ocupados",
  horarioController.getHorariosOcupadosDelMesPorMedEspId
);
module.exports = router;
