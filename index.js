// api/index.js
const express = require('express');
const cors = require('cors');
const Serverless = require('serverless-http');

// Importar rutas con rutas absolutas
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const respuestaRoutes = require('./src/routes/respuestaRoutes');
const historialRoutes = require('./src/routes/historialRoutes');
const preguntaRoutes = require('./src/routes/preguntaRoutes');

// Crear una nueva instancia de Express para Vercel
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas con prefijo /api
app.use('/api/usuario', usuarioRoutes);
app.use('/api/respuesta', respuestaRoutes);
app.use('/api/pregunta', preguntaRoutes);
app.use('/api/historial', historialRoutes);

// Ruta de salud para verificar
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Serverless Function working',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Ruta por defecto para 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Exportar para Vercel
module.exports = Serverless(app);