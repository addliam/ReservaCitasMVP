const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");

const checkGoogleAuthToken = require("../middlewares/checkGoogleAuthTokenMiddleware");
const checkPaciente = require("../middlewares/paciente/checkPaciente");
const authJwt = require("../middlewares/authJwtMiddleware");

// router.get("/", pacienteController.getTodosPacientes);
router.post(
  "/google-auth",
  checkGoogleAuthToken,
  pacienteController.postPaciente
);
router.get("/perfil", authJwt, pacienteController.getPacienteInformacion);
router.put(
  "/perfil",
  authJwt,
  checkPaciente,
  pacienteController.updatePacienteInfo
);
module.exports = router;
