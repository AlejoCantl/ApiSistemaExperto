const express = require("express");

const router = express.Router();

const  usuarioController = require("../controllers/usuarioController.js");

router.get("/get", usuarioController.getUsuarios);
router.get("/get/:identificacion", usuarioController.getUsuarioById);
router.post("/login", usuarioController.login);

module.exports = router;