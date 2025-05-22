import { Router } from "express"
import {
  obtenerTodosLosRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol,
} from "../controllers/rol-controller.js"

import { createRolValidation, validacionActualizacionRol, validarIdRol } from "../middlewares/rol-validator.js"
import { handleValidationErrors } from "../middlewares/validationHandler.js"

const routerol = Router()

routerol.get("/", obtenerTodosLosRoles)
routerol.get("/:id", validarIdRol, handleValidationErrors, obtenerRolPorId)
routerol.post("/", createRolValidation, handleValidationErrors, crearRol)
routerol.put("/:id", validarIdRol, validacionActualizacionRol, handleValidationErrors, actualizarRol)
routerol.delete("/:id", validarIdRol, handleValidationErrors, eliminarRol)

export default routerol
