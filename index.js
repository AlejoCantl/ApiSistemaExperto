const express = require("express")
const cors = require("cors")

const usuarioRoutes = require("./src/routes/usuarioRoutes.js")
const respuestaRoutes = require("./src/routes/respuestaRoutes.js")
const historialRoutes = require("./src/routes/historialRoutes.js")
const preguntaRoutes = require("./src/routes/preguntaRoutes.js")

const app = express()
app.use(cors())
app.use(express.json())

// Rutas sin prefijo /api para desarrollo local
app.use("/usuario", usuarioRoutes)
app.use("/respuesta", respuestaRoutes)
app.use("/pregunta", preguntaRoutes)
app.use("/historial", historialRoutes)

// Ruta de salud
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Servidor local funcionando" })
})

const serverless = require("serverless-http")

// Solo iniciar servidor si se ejecuta directamente
if (require.main === module) {
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`🟢 Servidor LOCAL escuchando en http://localhost:${PORT}`)
    console.log(`📋 Health check: http://localhost:${PORT}/health`)
  })
}

module.exports = app
module.exports.handler = serverless(app)
