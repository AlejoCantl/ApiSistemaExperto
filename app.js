const express = require("express")
const cors = require("cors")

const usuarioRoutes = require("./src/routes/usuarioRoutes")
const respuestaRoutes = require("./src/routes/respuestaRoutes")
const historialRoutes = require("./src/routes/historialRoutes")
const preguntaRoutes = require("./src/routes/preguntaRoutes")

const app = express()
app.use(cors())
app.use(express.json())

// Routes for local development
app.use("/api/usuario", usuarioRoutes)
app.use("/api/respuesta", respuestaRoutes)
app.use("/api/pregunta", preguntaRoutes)
app.use("/api/historial", historialRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Local server running" })
})

// Only start server if running locally
if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`🟢 Local server running on http://localhost:${PORT}`)
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`)
  })
}

module.exports = app
