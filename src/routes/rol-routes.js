import { Router } from "express"
import {
  obtenerTodosLosRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol,

} from "../controllers/rol-controller.js"

const routerol = Router()

routerol.get("/", obtenerTodosLosRoles)
routerol.get("/:id", obtenerRolPorId)
routerol.post("/", crearRol)
routerol.put("/:id", actualizarRol)
routerol.delete("/:id", eliminarRol)


export default routerol
