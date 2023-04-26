const express = require("express");
const router = express.Router();
const medicoController = require("../controllers/medicoController");

router.get("/", medicoController.getTodosMedicos);

module.exports = router;
