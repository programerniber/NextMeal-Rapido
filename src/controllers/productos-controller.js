import {ProductoService} from "../services/producto-services.js";
const productoService = new ProductoService();

export async function obtenerProductos(req, res) {
    try {
      const productos = await productoService.ObtenerProducto();
      res.status(200).json({ exito: true, data: productos });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
    } 
  }

export async function obtenerProductoPorId(req, res) {
    try {
      const { id } = req.params;
      const producto = await productoService.obtenerProductoPorId(id);
      res.status(200).json({ exito: true, data: producto });
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      if (error.message === "Producto no encontrado") {
        return res.status(404).json({ exito: false, mensaje: error.message });
      }
      res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
    }
  }
 
export async function crearProducto(req, res) {
    try {
        const { nombre_producto, cantidad, precio_producto } = req.body;

        // Validación de datos
        if (!nombre_producto || !cantidad || !precio_producto) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const nuevoProducto = await productoService.create({
            nombre_producto,
            cantidad,
            precio_producto
        });

        res.json({ message: 'Producto creado', producto: nuevoProducto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Problemas para crear un producto' });
    }
}

export async function actualizarProducto(req,res) {
    try{
        const id = req.params.id;
        const {nombre_producto, cantidad, precio_producto} =req.body;
        const [actualizado]= await productoService.update({
            nombre_producto,
            cantidad,
            precio_producto
        },{
            where:{ id },
        });
        if (actualizado){
            res.json('Actualizacion exitosa')
        } else{
            res.status(404).json('Cliente no encontrado');
        }
    } catch(error){
        console.error(error);
        res.status(500).json('Problemas con la actualización');
    }
}

export async function eliminarProducto(req,res) {
    try{
        const id = req.params.id;
        const eliminado = await productoService.destroy({
            where: {id},
        });
        if(eliminado){
            res.json('Producto eliminado')
        }else{
            res.status(400).json('Producto no encontrado')
        }
    } catch(error){
        console.error(error);
        res.status(500).json('Problemas al eliminar')
    }
    
}