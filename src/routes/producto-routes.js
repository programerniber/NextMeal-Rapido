import { Router } from "express";
import {
    obtenerProductos,
    crearProducto,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
} from "../controllers/producto-controller.js"
import { 
    autenticar,
    autorizar } from '../middlewares/autenticador-validator.js';
import{
    validarCreacionProducto,
    validarActualizacionProducto,
    validarIdProducto
} from'../middlewares/producto-validator.js'

const routerproducto = Router();
routerproducto.get('/', autenticar, obtenerProductos);
routerproducto.post('/',validarCreacionProducto,autenticar, autorizar('admin'), crearProducto);
routerproducto.get('/:id', validarIdProducto, obtenerProductoPorId)
routerproducto.put('/', validarActualizacionProducto, actualizarProducto)
routerproducto.delete('/', validarIdProducto, eliminarProducto)

export default routerproducto;
