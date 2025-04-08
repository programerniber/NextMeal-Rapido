import { Router } from "express"
import {
  obtenerProductos,
  obtenerProductoPorID,
  crearProductos,
  actualizarProductos,
  eliminarProductos,
} from "../controllers/productos-controller.js"
import { autenticar } from "../middlewares/autenticador-validator.js"
import { verificarPermiso } from "../middlewares/permiso-validator.js"
import {
  validarCreacionProducto,
  validarActualizacionProducto,
  validarIdProducto,
} from "../middlewares/productos-validator.js"

const routerproducto = Router()

// Rutas públicas o que solo requieren autenticación
routerproducto.get("/", obtenerProductos)
routerproducto.get("/:id", validarIdProducto, obtenerProductoPorID)

// Rutas que requieren autenticación y permisos específicos
routerproducto.post("/", //autenticar, 
  //verificarPermiso("productos", "crear"),
   validarCreacionProducto, crearProductos)
routerproducto.put(
  "/:id",
 // autenticar,
  //verificarPermiso("productos", "editar"),
  validarIdProducto,
  validarActualizacionProducto,
  actualizarProductos
)
routerproducto.delete("/:id", //autenticar,
   //verificarPermiso("productos", "eliminar"), 
   validarIdProducto, eliminarProductos)

export default routerproducto
