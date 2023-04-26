const express = require("express");
const router = express.Router();
const consultorioController = require("../controllers/consultorioController");

router.get("/", consultorioController.getTodosConsultorio);

module.exports = router;
