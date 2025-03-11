import { Router } from "express";
import { 
  obtenerTodos, 
  obtenerPorId, 
  crearpedidos, 
  actualizarpedidos, 
  eliminarpedidos, 
  cambiarEstadopedidos
} from "../controllers/pedido-controller.js";
import { 
  validarCreacionPedido, 
  validarActualizacionPedido, 
  validarIdPedido, 
  validarCambioEstadoPedido 
} from "../middlewares/pedido-validator.js";



const routerpedido = Router();

routerpedido.get("/", obtenerTodos);
routerpedido.get("/:id", validarIdPedido, obtenerPorId);
routerpedido.post("/",validarCreacionPedido, crearpedidos);
routerpedido.put("/:id",validarIdPedido, validarActualizacionPedido, actualizarpedidos);
routerpedido.delete("/:id", validarIdPedido, eliminarpedidos);
routerpedido.patch("/:id/estado", validarIdPedido, validarCambioEstadoPedido, cambiarEstadopedidos);

export default routerpedido;
