const db = require('../config/config.js');
const preguntaQueries = {
    getAllPreguntas: 'SELECT * FROM pregunta;',
    getPreguntaById: 'SELECT * FROM pregunta WHERE id = ?;',
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