const express = require("express");
const router = express.Router();
const checkGoogleAuthToken = require("../middlewares/checkGoogleAuthTokenMiddleware");
const authJwt = require("../middlewares/authJwtMiddleware");
const pacienteController = require("../controllers/pacienteController");

router.get("/", pacienteController.getTodosPacientes);
router.post(
  "/google-auth",
  checkGoogleAuthToken,
  pacienteController.postPaciente
);
router.get("/perfil", authJwt, pacienteController.getPacienteInformacion);
router.put("/:id", authJwt, pacienteController.updatePacienteInfo);
module.exports = router;
