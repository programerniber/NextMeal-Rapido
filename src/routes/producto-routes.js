import { Router } from "express"
import {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/producto-controller.js"

import { 
  validarCreacionProducto,
  validarActualizacionProducto,
  validarIdProducto
} from "../middlewares/producto-validator.js"

const routerproducto = Router()   

routerproducto.get("/", obtenerTodosLosProductos)
routerproducto.get("/:id", validarIdProducto, obtenerProductoPorId)
routerproducto.post("/", validarCreacionProducto, crearProducto)
routerproducto.put("/:id", validarIdProducto, validarActualizacionProducto, actualizarProducto)
routerproducto.delete("/:id", validarIdProducto, eliminarProducto)

export default routerproducto
