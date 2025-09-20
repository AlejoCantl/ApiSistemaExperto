const db = require("../config/config.js");

const userQueries = {
    selectAll: "select ID as id, NOMBRE as nombre, APELLIDO as apellido, IDENTIFICACION as identificacion, EDAD as edad, SEXO as sexo, EMAIL as correo from usuario",
    selectById: "select ID as id, NOMBRE as nombre, APELLIDO as apellido, IDENTIFICACION as identificacion, EDAD as edad, SEXO as sexo, EMAIL as correo from usuario where identificacion = ?",
    insert: "insert into usuario (nombre, apellido, identificacion, edad, sexo) values (?, ?, ?, ?, ?)",
    update: "update usuario set nombre = ?, apellido = ?, identificacion = ?, edad = ?, sexo = ? where identificacion = ?",
    delete: "delete from usuario where identificacion = ?",
    login: "select u.NOMBRE as nombre, u.APELLIDO as apellido, u.IDENTIFICACION as identificacion, u.EDAD as edad, u.SEXO as sexo, tu.NOMBRE as rol from usuario u inner join tipo_usuario tu on u.rol_id = tu.ID where u.USERNAME = ? AND u.PASSWORD = ?"
};

class Usuario {
    async getUsuarios() {
        const [rows] = await db.query(userQueries.selectAll);
        return rows;
    }

    async createUsuario(data) {
        const { nombre, apellido, identificacion, edad, sexo } = data;
        const params = [nombre, apellido, identificacion, edad, sexo];
        const [result] = await db.query(userQueries.insert, params);
        return result.insertId;
    }

    // async updateUsuario(identificacion, data) {
    //     const { nombre, apellido, edad, sexo } = data;
    //     const params = [nombre, apellido, edad, sexo, identificacion];
    //     const [result] = await db.query(userQueries.update, params);
    //     return result.affectedRows;
    // }

    // async deleteUsuario(identificacion) {
    //     const params = [identificacion];
    //     const [result] = await db.query(userQueries.delete, params);
    //     return result.affectedRows;
    // }

    async getUsuarioById(identificacion) {
        const params = [identificacion];
        const [rows] = await db.query(userQueries.selectById, params);
        return rows[0];
    }

    async findOrCreateUser(usuario) {
        let user = await this.getUsuarioById(usuario.identificacion);
        if (!user) {
            const insertId = await this.createUsuario(usuario);
        
            // DEVUELVE UN OBJETO CONSISTENTE
            return { id: insertId };
        }
        return user;
    }
    
    async login(username, password) {
        const params = [username, password];
        const [rows] = await db.query(userQueries.login, params);
        return rows[0];
    }

}

module.exports = new Usuario();