import Producto from "../models/producto-model.js";
import Categoria from "../models/categoria-model.js";

export class ProductoService{
    async ObtenerProducto(){
        return await Producto.findAll({
            include: {
                model: Categoria,
                attributes: ["nombre"], 
              },
              order: [["id", "DESC"]],
            });
        };
    

    async obtenerProductoPorId(id){
        const producto = await Producto.findByPk(id);
        if(!producto) throw new console.Error("Producto no encontrado");
        return producto;
    }

    async crearProducto(productoData){
        return await Producto.create(productoData);
    }

    async actualizarProducto(id,productoData){
        const producto = await this.obtenerProductoPorId(id, productoData)
        return await producto.update(productoData);
    }

    async eliminarProducto(id){
        const producto = await this.obtenerProductoPorId(id)
        await producto.destroy();
        return {mensaje: "Producto eliminado con exito"}
    }
}
