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
import { autenticar, autorizarAdmin } from "../middlewares/autenticador-validator.js"

const router = Router()


router.get("/", autenticar, obtenerTodosLosClientes)
router.get("/:id", autenticar, validarIdCliente, obtenerClientePorId)
router.post("/", autenticar, autorizarAdmin, validarCreacionCliente, crearCliente)
router.put("/:id", autenticar, autorizarAdmin, validarIdCliente, validarActualizacionCliente, actualizarCliente)
router.delete("/:id", autenticar, autorizarAdmin, validarIdCliente, eliminarCliente)
router.patch("/:id/estado", autenticar, autorizarAdmin, validarCambioEstado, cambiarEstadoCliente)

export default router

