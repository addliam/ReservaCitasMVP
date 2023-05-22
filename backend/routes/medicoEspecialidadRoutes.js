const express = require("express");
const router = express.Router();
const medicoEspecialidadController = require("../controllers/medicoEspecialidadController");
const authJwt = require("../middlewares/authJwtMiddleware");
const checkMedico = require("../middlewares/medico/checkMedico");

// router.get("/", medicoEspecialidadController.getTodosMedicoEspecialidad);
router.get("/pretty", medicoEspecialidadController.getTodosPretty);
router.get(
  "/medico/lista",
  authJwt,
  checkMedico,
  medicoEspecialidadController.getMedicoEspecialidadListById
);
// lo pongo aca abajo porq sino /lista nunca es alcanzable
router.get("/:id", medicoEspecialidadController.getMedicoEspecialidadInfoById);
module.exports = router;
