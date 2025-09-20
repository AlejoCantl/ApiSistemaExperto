const app = require('../app'); // Importa la app de Express del archivo principal

// Exporta como función de Vercel
module.exports = (req, res) => {
  // Agrega el prefijo /api a todas las rutas para Vercel
  const originalUrl = req.url;
  req.url = `/api${originalUrl}`;
  
  return app(req, res);
};