const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresaController");

const checkGoogleAuthToken = require("../middlewares/checkGoogleAuthTokenMiddleware");
const authJwtMiddleware = require("../middlewares/authJwtMiddleware");
const checkEmpresa = require("../middlewares/empresa/checkEmpresa");

router.get("/", authJwtMiddleware, empresaController.getEmpresaInfo);
router.post(
  "/google-auth",
  checkGoogleAuthToken,
  empresaController.postEmpresa
);
// ?especialidad=1&provincia=Lima&departamento=Lima
router.get("/filtrar/", empresaController.getEmpresasConFiltro);
router.get(
  "/medico/pendiente",
  authJwtMiddleware,
  checkEmpresa,
  empresaController.getMedicoListaPendientes
);
router.post(
  "/medico/aprobar/:id",
  authJwtMiddleware,
  checkEmpresa,
  empresaController.aprobarMedico
);
router.put(
  "/",
  authJwtMiddleware,
  checkEmpresa,
  empresaController.updateEmpresaInfo
);

module.exports = router;
