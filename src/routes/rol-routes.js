import { Router } from "express";
import {
  obtenerRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol
} from "../controllers/rol-controller.js";

const routerol = Router();

routerol.get("/", obtenerRoles);
routerol.get("/:id", obtenerRolPorId);
routerol.post("/", crearRol);
routerol.put("/:id", actualizarRol);
routerol.delete("/:id", eliminarRol);

export default routerol;
