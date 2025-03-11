import app from "./app.js"
import Usuario from "./src/models/usuario-model.js"
import Rol from "./src/models/rol-model.js"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
  console.log(`API disponible en http://localhost:${PORT}`)
})

