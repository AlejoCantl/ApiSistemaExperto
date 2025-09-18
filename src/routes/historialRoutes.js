const express = require('express');
const router = express.Router();

const historialController = require('../controllers/historialController.js');

router.get('/get/:id', historialController.getAllHistorialByUserId);
router.get('/get/:id/last', historialController.getLastHistorialByUserId);
router.get('/get', historialController.getAllHistorialFromUsers);
router.get('/get/:id/progreso', historialController.getAllProgresoHistorial);
router.get('/get/:id/progreso/last', historialController.getLastProgresoHistorial);

module.exports = router;
