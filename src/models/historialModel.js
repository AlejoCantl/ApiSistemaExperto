const db = require('../config/config.js');
const historialQueries = {
  getAllHistorialByUserId: `SELECT 
                                historial.id AS id,
                                historial.id_usuario AS id_usuario,
                                historial.id_diagnostico AS id_diagnostico,
                                historial.fecha AS fecha,
                                JSON_OBJECT(
                                  'identificacion', usuario.identificacion,
                                  'nombre', usuario.nombre,
                                  'apellido', usuario.apellido,
                                  'edad', usuario.edad,
                                  'sexo', usuario.sexo
                                ) AS usuario,
                                JSON_OBJECT(
                                  'nombre', diagnostico.nombre,
                                  'descripcion', diagnostico.descripcion,
                                  'recomendaciones', diagnostico.recomendaciones,
                                  'nivel_gravedad', diagnostico.nivel_gravedad
                                ) AS diagnostico,
                                JSON_ARRAYAGG(
                                  JSON_OBJECT(
                                    'pregunta', pregunta.pregunta,
                                    'respuesta', hecho.respuesta
                                  )
                                ) AS preguntas_respuestas
                                FROM historial
                                INNER JOIN diagnostico ON historial.id_diagnostico = diagnostico.id
                                INNER JOIN usuario ON historial.id_usuario = usuario.id
                                INNER JOIN hecho ON historial.id = hecho.id_historial
                                INNER JOIN pregunta ON hecho.id_pregunta = pregunta.id
                                WHERE usuario.identificacion = ?
                                GROUP BY historial.id
                                ORDER BY historial.fecha DESC;
`,
  getLastHistorialByUserId: `SELECT 
                            historial.id AS id,
                            historial.id_usuario AS id_usuario,
                            historial.id_diagnostico AS id_diagnostico,
                            historial.fecha AS fecha,
                            JSON_OBJECT(
                              'identificacion', usuario.identificacion,
                              'nombre', usuario.nombre,
                              'apellido', usuario.apellido,
                              'edad', usuario.edad,
                              'sexo', usuario.sexo
                            ) AS usuario,
                            JSON_OBJECT(
                              'nombre', diagnostico.nombre,
                              'descripcion', diagnostico.descripcion,
                              'recomendaciones', diagnostico.recomendaciones,
                              'nivel_gravedad', diagnostico.nivel_gravedad
                            ) AS diagnostico,
                            JSON_ARRAYAGG(
                              JSON_OBJECT(
                                'pregunta', pregunta.pregunta,
                                'respuesta', hecho.respuesta
                              )
                            ) AS preguntas_respuestas
                            FROM historial
                            INNER JOIN diagnostico ON historial.id_diagnostico = diagnostico.id
                            INNER JOIN usuario ON historial.id_usuario = usuario.id
                            INNER JOIN hecho ON historial.id = hecho.id_historial
                            INNER JOIN pregunta ON hecho.id_pregunta = pregunta.id
                            WHERE usuario.identificacion = ?
                            GROUP BY historial.id
                            ORDER BY historial.fecha DESC
                            LIMIT 1;`,
  getAllHistorialFromUsers: `SELECT 
                                historial.id AS id,
                                historial.id_usuario AS id_usuario,
                                historial.id_diagnostico AS id_diagnostico,
                                historial.fecha AS fecha,
                                JSON_OBJECT(
                                  'identificacion', usuario.identificacion,
                                  'nombre', usuario.nombre,
                                  'apellido', usuario.apellido,
                                  'edad', usuario.edad,
                                  'sexo', usuario.sexo
                                ) AS usuario,
                                JSON_OBJECT(
                                  'nombre', diagnostico.nombre,
                                  'descripcion', diagnostico.descripcion,
                                  'recomendaciones', diagnostico.recomendaciones,
                                  'nivel_gravedad', diagnostico.nivel_gravedad
                                ) AS diagnostico,
                                JSON_ARRAYAGG(
                                  JSON_OBJECT(
                                    'pregunta', pregunta.pregunta,
                                    'respuesta', hecho.respuesta
                                  )
                                ) AS preguntas_respuestas
                                FROM historial
                                INNER JOIN diagnostico ON historial.id_diagnostico = diagnostico.id
                                INNER JOIN usuario ON historial.id_usuario = usuario.id
                                INNER JOIN hecho ON historial.id = hecho.id_historial
                                INNER JOIN pregunta ON hecho.id_pregunta = pregunta.id
                                GROUP BY historial.id
                                ORDER BY historial.fecha DESC;`,
  create: "INSERT INTO historial (ID_USUARIO, FECHA) VALUES (?, ?)",
  update: "UPDATE historial SET ID_USUARIO = ?, FECHA = ?, ID_DIAGNOSTICO = ? WHERE ID = ?",
  getAllProgresoHistorial: `SELECT 
                              JSON_OBJECT('id',u.id,'nombre', u.nombre, 'apellido', u.apellido, 'identificacion', u.identificacion, 'edad', u.edad, 'sexo', u.sexo, 'correo', u.email) AS usuario, 
                              JSON_ARRAYAGG(JSON_OBJECT('progreso', p.descripcion, 'fecha', p.fecha)) AS progreso 
                              FROM progreso p JOIN usuario u 
                              ON p.id_usuario = u.id 
                              WHERE u.identificacion = ? 
                              GROUP BY u.id 
                              ORDER BY p.fecha`,
  getLastProgresoHistorial: `SELECT 
                              JSON_OBJECT('id', u.id, 'nombre', u.nombre, 'apellido', u.apellido, 'identificacion', u.identificacion, 'edad', u.edad, 'sexo', u.sexo, 'correo', u.email) AS usuario, 
                              JSON_OBJECT('progreso', p.descripcion, 'fecha', p.fecha) AS progreso 
                              FROM progreso p JOIN usuario u ON p.id_usuario = u.id  
                              WHERE u.identificacion = ? 
                              ORDER BY p.fecha 
                              DESC LIMIT 1`,
  createProgreso: 'INSERT INTO progreso (id_usuario, fecha, descripcion) VALUES (?, ?, ?)'
}

class HistorialModel {
  async getAllHistorialByUserId(userId) {
    const [rows] = await db.query(historialQueries.getAllHistorialByUserId, [userId]);
    return rows;
  }

  async getLastHistorialByUserId(userId) {
    const [rows] = await db.query(historialQueries.getLastHistorialByUserId, [userId]);
    return rows[0] || null;
  }

  async createHistorial(data) {
    const { id_usuario, fecha } = data;
    const [result] = await db.query(historialQueries.create, [id_usuario, fecha]);
    return result.insertId;
  }

  async updateHistorial(id, data) {
    const { id_usuario, fecha, id_diagnostico } = data;
    const [result] = await db.query(historialQueries.update, [id_usuario, fecha, id_diagnostico, id]);
    return result.affectedRows;
  }

  async getAllHistorialFromUsers() {
    const [rows] = await db.query(historialQueries.getAllHistorialFromUsers);
    return rows;
  }


  async getAllProgresoHistorial(userId) {
    const [rows] = await db.query(historialQueries.getAllProgresoHistorial, [userId]);
    return rows;
  }

  async getLastProgresoHistorial(userId) {
    const [rows] = await db.query(historialQueries.getLastProgresoHistorial, [userId]);
    return rows[0] || null;
  }
  async createProgreso(data) {
    const { id_usuario, fecha, descripcion } = data;
    const [result] = await db.query(historialQueries.createProgreso, [id_usuario, fecha, descripcion]);
    return result.insertId;
  }
}


module.exports = new HistorialModel();