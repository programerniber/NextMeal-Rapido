import { Router } from "express"
import {
  obtenerTodasLasCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../controllers/categoria-controller.js"
import {
  validarCreacionCategoriaExistente,
  validacionActualizacionCategorias,
  validarIdCategoria,
} from "../middlewares/categoria-validator.js"

import { autenticar, autorizarAdmin } from "../middlewares/autenticador-validator.js"

const routercategoria = Router()

routercategoria.get("/", autenticar, obtenerTodasLasCategorias)
routercategoria.get("/:id", autenticar, validarIdCategoria, obtenerCategoriaPorId)
routercategoria.post("/", autenticar, autorizarAdmin, validarCreacionCategoriaExistente, crearCategoria)
routercategoria.put("/:id",autenticar,autorizarAdmin,validacionActualizacionCategorias,validarIdCategoria,actualizarCategoria,)
routercategoria.delete("/:id", autenticar, autorizarAdmin, validarIdCategoria, eliminarCategoria)

export default routercategoria

