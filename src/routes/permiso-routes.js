import express from "express";
import { 
  obtenerPermisos, 
  obtenerPermisosPorUsuario, 
  crearPermiso, 
  actualizarPermiso, 
  eliminarPermiso 
} from "../controllers/permiso-controller.js";
import { autenticar, autorizarAdmin } from "../middlewares/autenticador-validator.js";

const routerPermisos = express.Router();

// Rutas protegidas para administradores
routerPermisos.get("/", autenticar, obtenerPermisos);
routerPermisos.get("/usuario/:id_usuario", autenticar, obtenerPermisosPorUsuario);
routerPermisos.post("/", autenticar, autorizarAdmin, crearPermiso);
routerPermisos.put("/:id", autenticar, autorizarAdmin, actualizarPermiso);
routerPermisos.delete("/:id", autenticar, autorizarAdmin, eliminarPermiso);

export default routerPermisos;

