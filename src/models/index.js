import { sequelize } from "../config/database.js"
import Cliente from "./cliente.model.js"

// Exportar los modelos
export const models = {
  Cliente
}

// Sincronizar modelos con la base de datos
export const sincronizarModelos = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log("Modelos sincronizados correctamente")
  } catch (error) {
    console.error("Error al sincronizar modelos:", error)
  }
}



