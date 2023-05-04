const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// const multer = require("multer");
// const upload = multer({});

router.post("/google", authController.googleAuthentication);
module.exports = router;
