import { Router } from "express"
import {
  obtenerTodos,
  obtenerPorId,
  crearpedidos,
  actualizarpedidos,
  eliminarpedidos,
  cambiarEstadopedidos,
} from "../controllers/pedido-controller.js"
import {
  validarCreacionPedido,
  validarActualizacionPedido,
  validarIdPedido,
  validarCambioEstadoPedido,
} from "../middlewares/pedido-validator.js"
import { autenticar, autorizarAdmin } from "../middlewares/autenticador-validator.js"

const routerpedido = Router()


routerpedido.get("/", autenticar, obtenerTodos)
routerpedido.get("/:id", autenticar, validarIdPedido, obtenerPorId)
routerpedido.post("/", autenticar, autorizarAdmin, validarCreacionPedido, crearpedidos)
routerpedido.put("/:id", autenticar, autorizarAdmin, validarIdPedido, validarActualizacionPedido, actualizarpedidos)
routerpedido.delete("/:id", autenticar, autorizarAdmin, validarIdPedido, eliminarpedidos)
routerpedido.patch(
  "/:id/estado",
  autenticar,
  autorizarAdmin,
  validarIdPedido,
  validarCambioEstadoPedido,
  cambiarEstadopedidos,
)

export default routerpedido

