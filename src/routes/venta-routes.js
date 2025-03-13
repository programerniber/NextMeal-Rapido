import { Router } from "express"
import {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
} from "../controllers/venta-controller.js"
import { validarCreacionVenta, validarActualizacionVenta, validarIdVenta } from "../middlewares/venta-validator.js"
import { autenticar, autorizarAdmin } from "../middlewares/autenticador-validator.js"

const routerVenta = Router()


routerVenta.get("/", autenticar, obtenerVentas)
routerVenta.get("/:id", autenticar, validarIdVenta, obtenerVentaPorId)
routerVenta.post("/", autenticar, autorizarAdmin, validarCreacionVenta, crearVenta)
routerVenta.put("/:id", autenticar, autorizarAdmin, validarIdVenta, validarActualizacionVenta, actualizarVenta)
routerVenta.delete("/:id", autenticar, autorizarAdmin, validarIdVenta, eliminarVenta)

export default routerVenta

