
import Product from "../module/product.js";

export async function ObtenerProducto(req,res) {
    try{
        const product = await Product.findAll();
        res.json(product);
    }catch(error){
        console.error(error);
        res.status(500).json('Problemas para obtener los productos')
    }
}
 
export async function crearProducto(req, res) {
    try {
        const { nombre_producto, cantidad, precio_producto } = req.body;

        // Validación de datos
        if (!nombre_producto || !cantidad || !precio_producto) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const nuevoProducto = await Product.create({
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
        const [actualizado]= await Product.update({
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
        const eliminado = await Product.destroy({
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