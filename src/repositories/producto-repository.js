import Producto from "../models/producto-model";

export class ProductoRepository{
    async obtenertodos(){
        return await Producto.findAll({
            order:[["id","DESC"]],
        })
    }
    async obtenerPorId(id){
        return await Producto.findBypk(id)
    }

    async obtenerPorNombre(nombre){
        return await Producto.findOne({where:{NOMBRE:nombre}})
    }

    async crear(productoData){
        return await Producto.create(productoData)
    }

    async actualizar(id, productoData){
        const producto= await Producto.findBypk(id)
        if(!producto) return null
        
        return await producto.update(productoData)
    }

    async eliminar(id){
        const producto = await Producto.findBypk(id)
        if (!producto) return false

        await producto.destroy()
        return true
    }
}