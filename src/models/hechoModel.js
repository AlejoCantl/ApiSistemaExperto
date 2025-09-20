const db = require("../config/config.js");

const hechoQueries = {
  selectAll: "SELECT * FROM hecho",
  selectById: "SELECT * FROM hecho WHERE ID_HECHO = ?",
  insert: "INSERT INTO hecho (ID_HISTORIAL, ID_PREGUNTA, RESPUESTA) VALUES (?, ?, ?)",
  update: "UPDATE hecho SET ID_HISTORIAL = ?, ID_PREGUNTA = ?, RESPUESTA = ? WHERE ID_HECHO = ?",
  delete: "DELETE FROM hecho WHERE ID = ?",
};

class Hecho {

  async createHecho(data) {
    const { ID_HISTORIAL, ID_PREGUNTA, RESPUESTA } = data;
    const params = [ID_HISTORIAL, ID_PREGUNTA, RESPUESTA];
    const [result] = await db.query(hechoQueries.insert, params);
    return result.insertId;
  }

}

module.exports = new Hecho();