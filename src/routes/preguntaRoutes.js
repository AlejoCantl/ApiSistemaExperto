const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/preguntaController.js');

router.get('/get', preguntaController.getAllPreguntas);

module.exports = router;