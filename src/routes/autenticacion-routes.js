import { Router } from "express"
import {
  login,
  obtenerUsuarioAutenticado,
  logout,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  crearUsuarioController,
} from "../controllers/autenticador-controller.js"
import { autenticar, autorizarAdmin } from "../middlewares/autenticador-validator.js"

const router = Router()

// Rutas públicas
router.post("/login", login)
router.post("/logout", logout)

// Rutas protegidas
router.get("/usuario-autenticado", autenticar, obtenerUsuarioAutenticado)

// Rutas de administración (protegidas y solo para admin)
router.get("/usuarios", autenticar, autorizarAdmin, obtenerUsuarios)
router.get("/usuarios/:id", autenticar, autorizarAdmin, obtenerUsuario)
router.post("/usuarios", crearUsuarioController)
router.put("/usuarios/:id", autenticar, autorizarAdmin, actualizarUsuario)
router.delete("/usuarios/:id", autenticar, autorizarAdmin, eliminarUsuario)

export default router