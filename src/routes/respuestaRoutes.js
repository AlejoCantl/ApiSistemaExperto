const express = require('express');
const router = express.Router();

const respuestaController = require('../controllers/respuestaController.js');

router.post('/add', respuestaController.enviarRespuesta);
router.post('/addWithoutSaving', respuestaController.enviarRespuestaSinGuardar);

module.exports = router;