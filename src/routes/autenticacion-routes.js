import express from "express";
import { 
  registrar, 
  login, 
  obtenerUsuarios, 
  obtenerUsuario, 
  actualizarUsuario, 
  eliminarUsuario, 
  cambiarRolUsuario 
} from "../controllers/autenticador-controller.js";
import { autenticar, autorizarAdmin, autorizarAdminOEmpleado } from "../middlewares/autenticador-validator.js";

const routerautenticacion = express.Router();

routerautenticacion.post("/registrar", registrar);
routerautenticacion.post("/login", login);

routerautenticacion.get("/", autenticar,
 autorizarAdmin, 
  obtenerUsuarios);
routerautenticacion.get("/:id", autenticar, obtenerUsuario);
routerautenticacion.put("/:id", autenticar, autorizarAdminOEmpleado, 
actualizarUsuario);
routerautenticacion.delete("/:id", autenticar, autorizarAdmin,
 eliminarUsuario);
routerautenticacion.patch("/:id/rol", autenticar,
   autorizarAdmin, 
cambiarRolUsuario
);

export default routerautenticacion;
