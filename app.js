import express from "express"
import cors from "cors"
import morgan from "morgan"
import { errorHandler } from "./src/middlewares/errorHandler.js"
import { conectarDB } from "./src/config/database.js"
import routerproducto from "./src/routes/producto-routes.js"
import routercategoria from "./src/routes/categoria-routes.js"
import routerautenticacion from "./src/routes/autenticacion-routes.js"

// Inicializar la aplicación
const app = express()


app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({ mensaje: "API de Restaurante funcionando correctamente" })
})

app.use('/api/autenticacion', routerautenticacion);
app.use('/api/productos', routerproducto);
app.use('/api/categoria', routercategoria);

// Middleware de manejo de errores
app.use(errorHandler)

// Conectar a la base de datos y sincronizar modelos
const initializeDatabase = async () => {
  try {
    await conectarDB() 
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
    process.exit(1)
  }
}

initializeDatabase()

export default app

