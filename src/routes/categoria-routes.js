import { Router } from "express";

import{
    obtenerTodasLasCategorias,
obtenerCategoriaPorId,
crearCategoria,
actualizarCategoria,
eliminarCategoria
}from "../controllers/categoria-controller.js"

import{validarCreacionCategoriaExistente,
    validacionActualizacionCategorias,
    validarIdCategoria 
} from "../middlewares/categoria-validator.js"

const routercategoria = Router()

routercategoria.get("/", obtenerTodasLasCategorias)
routercategoria.get("/:id", validarIdCategoria,obtenerCategoriaPorId)
routercategoria.post("/", validarCreacionCategoriaExistente,crearCategoria)
routercategoria.put("/:id", validacionActualizacionCategorias,validarIdCategoria, actualizarCategoria)
routercategoria.delete("/:id",validarIdCategoria, eliminarCategoria )

export default routercategoria;