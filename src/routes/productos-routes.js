import { Router } from "express"
import {
  obtenerProductos,
  crearProductos,
  obtenerProductoPorID,
  actualizarProductos,
  eliminarProductos,
} from "../controllers/productos-controller.js"
import { autenticar, autorizarAdmin } from "../middlewares/autenticador-validator.js"
import {
  validarCreacionProducto,
  validarActualizacionProducto,
  validarIdProducto,
} from "../middlewares/productos-validator.js"

const routerproducto = Router()


routerproducto.get("/", autenticar, obtenerProductos)
routerproducto.get("/:id", autenticar, validarIdProducto, obtenerProductoPorID)
routerproducto.post("/", autenticar, autorizarAdmin, validarCreacionProducto, crearProductos)
routerproducto.put(
  "/:id",
  autenticar,
  autorizarAdmin,
  validarIdProducto,
  validarActualizacionProducto,
  actualizarProductos,
)
routerproducto.delete("/:id", autenticar, autorizarAdmin, validarIdProducto, eliminarProductos)

export default routerproducto

