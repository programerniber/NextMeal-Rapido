import express from "express"
import cors from "cors"
import morgan from "morgan"
import { errorHandler } from "./src/middlewares/errorHandler.js"
import { connectDB } from "./src/config/database.js"

// Inicializar la aplicación
const app = express()

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Rutas


// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API de Restaurante funcionando correctamente" })
})

// Middleware de manejo de errores
app.use(errorHandler)

// Conectar a la base de datos y sincronizar modelos
const initializeDatabase = async () => {
  try {
    await connectDB() 
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
    process.exit(1)
  }
}

initializeDatabase()

export default app

