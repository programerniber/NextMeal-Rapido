import { Router } from "express"
import {
  obtenerTodosLosClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  cambiarEstadoCliente,
} from "../controllers/cliente-controller.js"
import { 
  validarCreacionCliente,
  validarActualizacionCliente,
  validarIdCliente,
  validarCambioEstado,
} from "../middlewares/cliente-validator.js"
 
const router = Router()  
  
router.get("/", obtenerTodosLosClientes)
router.get("/:id", validarIdCliente, obtenerClientePorId)
router.post("/", validarCreacionCliente, crearCliente)
router.put("/:id", validarIdCliente, validarActualizacionCliente, actualizarCliente)
router.delete("/:id", validarIdCliente, eliminarCliente)
router.patch("/:id/estado", validarCambioEstado, cambiarEstadoCliente)

export default router