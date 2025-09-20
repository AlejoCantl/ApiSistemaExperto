const db = require('../config/config.js');
const preguntaQueries = {
    getAllPreguntas: 'SELECT ID as id, Pregunta as pregunta FROM pregunta;',
    getPreguntaById: 'SELECT ID as id, Pregunta as pregunta FROM pregunta WHERE id = ?;',
};

const getAllPreguntas = async () => {
    const [rows] = await db.query(preguntaQueries.getAllPreguntas);
    return rows;
};

module.exports = {
    getAllPreguntas,
};