import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import { errorHandler } from "./src/middlewares/errorHandler.js"
import { conectarDB } from "./src/config/database.js"
import { sincronizarModelos } from "./src/models/index.js"
import clienteRoutes from "./src/routes/cliente.routes.js"

dotenv.config()

// Inicializar la aplicación
const app = express()

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({ mensaje: "API de Restaurante funcionando correctamente" })
})
 
// Rutas
app.use("/api/clientes", clienteRoutes)

// Middleware de manejo de errores
app.use(errorHandler) 

// Conectar a la base de datos y sincronizar modelos
const inicializarBaseDeDatos = async () => {
  try {
    await conectarDB()
    await sincronizarModelos()
    console.log("Base de datos inicializada correctamente")
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
    process.exit(1)
  }
}

inicializarBaseDeDatos()

export default app

