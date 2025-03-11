import { CategoriaServices } from "../services/categoria-services.js";

const categoryServices = new CategoriaServices()

export async function obtenerTodasLasCategorias(req, res) {
    try {
        const categoria = await categoryServices.obtenerTodasLasCategorias()
        res.status(200).json({exito:true, data: categoria})
    }catch(error){
        console.error("Error al obtener categorias", error)
        res.status(500).json({exito:false, mensaje:"error interno en el servidor"})
    }
}

export async function obtenerCategoriaPorId(req, res) {
    try{
        const{id} = req.params
        const categoria = await categoryServices.obtenerCategoriaPorId(id)
        res.status(200).json({exito:true,data:categoria})
    }catch(error){
        console.error("error al obtener la categoria por ID")
    }
    
}

export async function crearCategoria(req,res) {
    try{
        const categoriaData = req.body
        const nuevaCategoria = await categoryServices.crearCategoria(categoriaData)
        res.status(201).json({exito:true, data:nuevaCategoria,mensaje:"Categoria creada con exito"})
    }catch(error){
        console.error("Error al crear la categoria", error) 
        if (error.mensaje.includes("ya existe una categoria"))
        return res.status(400).json({exito: false,mensaje: error.menssage})
        res.status(500).json({exito:false, mensaje:"Error interno del servidos"})
    }
    
}


export async function actualizarCategoria(req,res) {
    try{
        const {id} = req.params
        const categoriaData = res.body
        const categoriaActualizado = await categoryServices.actualizarCategoria(id, categoriaData)
        res.status(200).json({exito:true, data:categoriaActualizado})
    } catch(error){
        console.error("Error al actualizar la categoria",error)
        if(error.mensaje ==="categoria no encontrado"){
            return res.status(400).json({exito:false, mensaje: error.menssage})
        }
        if(error.mensaje.includes("Ya existe una categoria igual")){
            return res.status(404).json({exito: false, mensaje: error.menssage})
        }
        res.status(500).json({exito: false, mensaje: error.mensaje})
    }
}

export async function eliminarCategoria(req, res) {
    try{
        const {id} = req.params
        const resultado = await categoryServices.eliminarCategoria(id)
        res.status(200).json({exito:true,data: resultado} )
    }catch(error){
        console.error("Error al eliminar una categoria", error)
        if(error.mensaje==="Categoria no encontrada"){
            return res.status(404).json({exito:false, mensaje: error.menssage})
        }
        res.status(500).json({exito:false, mensaje: error.menssage})
    }
}