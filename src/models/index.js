import { sequelize } from "../config/database.js"
import Cliente from "./cliente-model.js"
import Producto from "./producto-model.js"
import Pedido from "./pedido-model.js"
import DetallePedido from "./detalle_pedido-model.js"

export const models = {
  Cliente,
  Producto,
  Pedido,
  DetallePedido
}

export const sincronizarModelos = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log("Modelos sincronizados correctamente")
  } catch (error) {
    console.error("Error al sincronizar modelos:", error)
  }
}