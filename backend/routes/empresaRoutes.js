const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresaController");

const checkGoogleAuthToken = require("../middlewares/checkGoogleAuthTokenMiddleware");
const authJwtMiddleware = require("../middlewares/authJwtMiddleware");
const checkEmpresa = require("../middlewares/empresa/checkEmpresa");

router.get("/", authJwtMiddleware, empresaController.getEmpresaInfo);
router.get("/lista", empresaController.getTodasEmpresas);
router.get("/slug/:name", empresaController.getEmpresaInfoPorSlug);
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

// obtener todas las especialidades de cierta empresa por id
// select me.id, me."medicoId", m.nombre, me."especialidadId", e.nombre, me.precio from "medicoEspecialidad" me JOIN medico m ON m.id=me."medicoId"JOIN especialidad e ON e.id=me."especialidadId" WHERE m."empresaId"=4;
router.get(
  "/:id/especialidades",
  empresaController.getAllEspecialidadesEmpresaPorId
);

// aplicando filtros para de toda una empresa obetener los medicos q ejercen cierta especialidad
// /:id/medicos/especialidad?id=12
// sino especifica id obtiene de todas las especialidades
router.get(
  "/:id/medicos/especialidad",
  empresaController.getEmpresaEspecialidadesPorFiltro
);

// select DISTINCT me."especialidadId", e.nombre from "medicoEspecialidad" me JOIN medico m ON m.id=me."medicoId"JOIN especialidad e ON e.id=me."especialidadId" WHERE m."empresaId"=4;
//  especialidadId |   nombre
//  ----------------+-------------
//               38 | Nutrición
//               19 | Nefrología
//               25 | Pediatría
//                1 | Cardiología

module.exports = router;
