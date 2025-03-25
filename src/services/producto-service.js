import Producto from "../models/producto-model.js";

export class ProductoService {
  async obtenerTodosLosProductos() {
    return await Producto.findAll();
  }

  async obtenerProductoPorId(id) {
    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error("Producto no encontrado");
    return producto;
  }

  async crearProducto(productoData) {
    return await Producto.create(productoData);
  }

  async actualizarProducto(id, productoData) {
    const producto = await this.obtenerProductoPorId(id);
    return await producto.update(productoData);
  }

  async eliminarProducto(id) {
    const producto = await this.obtenerProductoPorId(id);
    await producto.destroy();
    return { mensaje: "Producto eliminado exitosamente" };
  }

  async cambiarPrecioProducto(id, precio) {
    const producto = await this.obtenerProductoPorId(id);
    return await producto.update({ precio });
  }
}
