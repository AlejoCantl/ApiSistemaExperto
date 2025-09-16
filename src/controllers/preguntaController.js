const preguntaModel = require('../models/preguntaModel.js');

const getAllPreguntas = async (req, res) => {
    const preguntas = await preguntaModel.getAllPreguntas();
    if (!preguntas) {
        return res.status(404).json({ message: 'No preguntas found' });
    }
    res.json(preguntas);
};

const getPreguntaById = async (req, res) => {
    const { id } = req.params;
    const pregunta = await preguntaModel.getPreguntaById(id);
    if (!pregunta) {
        return res.status(404).json({ message: 'Pregunta not found' });
    }
    res.json(pregunta);
};
module.exports = {
    getAllPreguntas,
    getPreguntaById,
};