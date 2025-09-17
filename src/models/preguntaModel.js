const db = require('../config/config.js');
const preguntaQueries = {
    getAllPreguntas: 'SELECT ID as id, Pregunta as pregunta FROM pregunta;',
    getPreguntaById: 'SELECT ID as id, Pregunta as pregunta FROM pregunta WHERE id = ?;',
};

const getAllPreguntas = async () => {
    const [rows] = await db.query(preguntaQueries.getAllPreguntas);
    return rows;
};

const getPreguntaById = async (id) => {
    const [rows] = await db.query(preguntaQueries.getPreguntaById, [id]);
    return rows[0];
}

module.exports = {
    getAllPreguntas,
    getPreguntaById,
};