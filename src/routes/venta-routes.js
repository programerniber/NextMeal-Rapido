import { Router } from "express";
import { 
  obtenerVentas, 
  obtenerVentaPorId, 
  crearVenta, 
  actualizarVenta, 
  eliminarVenta 
} from "../controllers/venta-controller.js";
import { 
  validarCreacionVenta, 
  validarActualizacionVenta, 
  validarIdVenta 
} from "../middlewares/venta-validator.js";

const routerVenta = Router();

routerVenta.get("/", obtenerVentas);
routerVenta.get("/:id", validarIdVenta, obtenerVentaPorId);
routerVenta.post("/", validarCreacionVenta, crearVenta);
routerVenta.put("/:id", validarIdVenta, validarActualizacionVenta, actualizarVenta);
routerVenta.delete("/:id", validarIdVenta, eliminarVenta);

export default routerVenta;
