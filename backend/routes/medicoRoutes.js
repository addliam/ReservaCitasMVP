const express = require("express");
const router = express.Router();
const medicoController = require("../controllers/medicoController");
const checkMedico = require("../middlewares/medico/checkMedico");
const checkGoogleAuthTokenMiddleware = require("../middlewares/checkGoogleAuthTokenMiddleware");
const authJwtMiddleware = require("../middlewares/authJwtMiddleware");

router.get("/", medicoController.getTodosMedicos);
router.put(
  "/perfil",
  authJwtMiddleware,
  checkMedico,
  medicoController.updateMedicoInfo
);
// informacion del perfil
router.get(
  "/perfil",
  authJwtMiddleware,
  checkMedico,
  medicoController.getMedicoPerfil
);
router.post(
  "/google-auth",
  checkGoogleAuthTokenMiddleware,
  medicoController.postMedico
);
// /cita?estado=pendiente
router.get(
  "/cita",
  authJwtMiddleware,
  checkMedico,
  medicoController.getCitaConFiltro
);
router.post(
  "/especialidad",
  authJwtMiddleware,
  checkMedico,
  medicoController.postEspecialidad
);
router.get(
  "/especialidad",
  authJwtMiddleware,
  checkMedico,
  medicoController.getMedicoEspecialidades
);
// actualizar precio de especialidad
router.put(
  "/especialidad/:id",
  authJwtMiddleware,
  checkMedico,
  medicoController.updateEspecialidadPrecio
);
// solicita la aprobacion de cierta empresa para continuar con otras funciones de su perfil
router.post(
  "/solicitar/:empresaId",
  authJwtMiddleware,
  checkMedico,
  medicoController.solicitarAprobacionEmpresa
);
// TODO en swagger
// GET /medicos/:id/horarios?fecha=:fecha&especialidad=:especialidad_id
router.get("/:id/horarios", medicoController.getHorarioDisponibleConFiltro);

module.exports = router;
