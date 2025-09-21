const express = require("express")
const cors = require("cors")

// Import routes - adjust paths based on your actual structure
const usuarioRoutes = require("../src/routes/usuarioRoutes")
const respuestaRoutes = require("../src/routes/respuestaRoutes")
const historialRoutes = require("../src/routes/historialRoutes")
const preguntaRoutes = require("../src/routes/preguntaRoutes")

const app = express()

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)
app.use(express.json())

// Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.sendStatus(200)
})

// Routes - Note: Vercel will handle the /api prefix
app.use("/usuario", usuarioRoutes)
app.use("/respuesta", respuestaRoutes)
app.use("/pregunta", preguntaRoutes)
app.use("/historial", historialRoutes)

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Vercel Serverless Function working",
    timestamp: new Date().toISOString(),
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err)
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  })
})

// Export the Express app
module.exports = app
