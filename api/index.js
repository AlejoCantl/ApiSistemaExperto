const express = require('express');
const serverLess = require('serverless-http');
const cors = require('cors');

const usuarioRoutes = require('../src/routes/usuarioRoutes.js');
const respuestaRoutes = require('../src/routes/respuestaRoutes.js');
const historialRoutes = require('../src/routes/historialRoutes.js');
const preguntaRoutes = require('../src/routes/preguntaRoutes.js');

const app = express();
app.use(cors());

//app.use(bodyparser.json());
app.use(express.json());
app.use('/usuario', usuarioRoutes);
app.use('/respuesta', respuestaRoutes);
app.use('/pregunta', preguntaRoutes);
app.use('/historial', historialRoutes);

module.exports = app;
module.exports.handler = serverLess(app);

// Si corres en local, levantar el server normalmente
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor local escuchando en http://localhost:${PORT}`);
  });
}
