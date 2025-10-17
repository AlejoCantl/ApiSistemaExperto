const express = require("express")
const cors = require("cors")

const usuarioRoutes = require("../src/routes/usuarioRoutes.js")
const respuestaRoutes = require("../src/routes/respuestaRoutes.js")
const historialRoutes = require("../src/routes/historialRoutes.js")
const preguntaRoutes = require("../src/routes/preguntaRoutes.js")

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
  res.json({ status: "OK", message: "Servidor vercel funcionando" })
})

//const serverless = require("serverless-http")

module.exports = app
