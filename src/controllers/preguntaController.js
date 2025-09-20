const preguntaModel = require('../models/preguntaModel.js');

const getAllPreguntas = async (req, res) => {
    const preguntas = await preguntaModel.getAllPreguntas();
    if (!preguntas) {
        return res.status(404).json({ error: 'No preguntas found' });
    }
    res.json({message: 'Preguntas recuperadas correctamente', data: preguntas});
};

module.exports = {
    getAllPreguntas,
};