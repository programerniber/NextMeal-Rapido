import app from "./app.js"
import dotenv from "dotenv"

dotenv.config()

const PUERTO = process.env.PORT || 3000

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`)
  console.log(`API disponible en http://localhost:${PUERTO}`)
})

 