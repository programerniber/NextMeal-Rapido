import { ProductoService } from "../services/producto-service.js";

const productoService = new ProductoService();

export async function obtenerTodosLosProductos(req, res) {
  try {
    const productos = await productoService.obtenerTodosLosProductos();
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
    const productoData = req.body;
    const nuevoProducto = await productoService.crearProducto(productoData);
    res.status(201).json({ exito: true, data: nuevoProducto, mensaje: "Producto creado exitosamente" });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function actualizarProducto(req, res) {
  try {
    const { id } = req.params;
    const productoData = req.body;
    const productoActualizado = await productoService.actualizarProducto(id, productoData);
    res.status(200).json({ exito: true, data: productoActualizado });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    if (error.message === "Producto no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function eliminarProducto(req, res) {
  try {
    const { id } = req.params;
    const resultado = await productoService.eliminarProducto(id);
    res.status(200).json({ exito: true, data: resultado });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    if (error.message === "Producto no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function cambiarPrecioProducto(req, res) {
  try {
    const { id } = req.params;
    const { precio } = req.body;
    const productoActualizado = await productoService.cambiarPrecioProducto(id, precio);
    res.status(200).json({ exito: true, data: productoActualizado });
  } catch (error) {
    console.error("Error al cambiar precio del producto:", error);
    if (error.message === "Producto no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}
