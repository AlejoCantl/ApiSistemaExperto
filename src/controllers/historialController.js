const {getAllHistorialByUserId, getLastHistorialByUserId, getAllHistorialFromUsers, getAllProgresoHistorial, getLastProgresoHistorial} = require('../models/historialModel.js');

module.exports = {

    getAllHistorialByUserId: async (req, res) => {
        try {
            const userId = req.params.id;
            const historial = await getAllHistorialByUserId(userId);
            if (!historial || historial.length === 0) {
                return res.status(404).json({ message: "Historial no encontrado para este usuario." });
            }
            res.json({message: "Historial encontrado para el usuario identificado con " + userId + ".", data: historial});
        } catch (err) {
            console.error("Error al obtener el historial:", err);
            res.status(500).json({ error: "Error al obtener el historial." });
        }
    },

    getLastHistorialByUserId: async (req, res) => {
        try {
            const userId = req.params.id;
            const historial = await getLastHistorialByUserId(userId);
            if (!historial || historial.length === 0) {
                return res.status(404).json({ message: "Historial no encontrado para este usuario." });
            }
            res.json({message: "Último historial encontrado para el usuario identificado con: " + userId + ".", data: historial});
        } catch (err) {
            console.error("Error al obtener el último historial:", err);
            res.status(500).json({ error: "Error al obtener el último historial." });
        }
    },

    getAllHistorialFromUsers: async (req, res) => {
        try {
            const historial = await getAllHistorialFromUsers();
            if (!historial || historial.length === 0) {
                return res.status(404).json({ message: "No se encontró historial para ningún usuario." });
            }
            res.json({message: "Historial encontrado para todos los usuarios.", data: historial});
        } catch (err) {
            console.error("Error al obtener el historial de todos los usuarios:", err);
            res.status(500).json({ error: "Error al obtener el historial de todos los usuarios." });
        }
    },

    getAllProgresoHistorial: async (req, res) => {
        try {
            const userId = req.params.id;
            const progresoHistorial = await getAllProgresoHistorial(userId);
            if (!progresoHistorial || progresoHistorial.length === 0) {
                return res.status(404).json({ message: "No se encontró progreso en el historial para este usuario." });
            }
            res.json({message: "Progreso en el historial encontrado para el usuario identificado con: " + userId + ".", data: progresoHistorial});
        } catch (err) {
            console.error("Error al obtener el progreso en el historial:", err);
            res.status(500).json({ error: "Error al obtener el progreso en el historial." });
        }
    },

    getLastProgresoHistorial: async (req, res) => {
        try {
            const userId = req.params.id;
            const progresoHistorial = await getLastProgresoHistorial(userId);
            if (!progresoHistorial || progresoHistorial.length === 0) {
                return res.status(404).json({ message: "No se encontró progreso en el historial para este usuario." });
            }
            res.json({message: "Último progreso en el historial encontrado para el usuario identificado con: " + userId + ".", data: progresoHistorial});
        } catch (err) {
            console.error("Error al obtener el último progreso en el historial:", err);
            res.status(500).json({ error: "Error al obtener el último progreso en el historial." });
        }
    }

}