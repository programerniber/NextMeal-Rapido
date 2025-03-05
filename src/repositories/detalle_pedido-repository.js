import Pedido from "../models/pedido-model.js";
import Producto from "../models/producto-model.js";
import DetallePedido from "../models/detalle_pedido-model.js";

class DetallePedidoRepository {
  
  async obtenerTodos() {
    return await DetallePedido.findAll({
      include: [
        { model: Pedido, 
          attributes: [ "estado"] },

        { model: Producto,
           attributes: ["nombre"] },
      ],
    });
  }

  
  async obtenerPorId(id) {
    return await DetallePedido.findByPk(id, {
      include: [
        { model: Pedido,
           attributes: [ "estado"] },
        { model: Producto,
           attributes: ["nombre"] },
      ],
    });
  }

  
  async crear(detalleData) {
    return await DetallePedido.create(detalleData);
  }

  
  async actualizar(id, detalleData) {
    const detalle = await DetallePedido.findByPk(id);
    if (!detalle) throw new Error("Detalle de pedido no encontrado");
    return await detalle.update(detalleData);
  }

  
  async eliminar(id) {
    const detalle = await DetallePedido.findByPk(id);
    if (!detalle) throw new Error("Detalle de pedido no encontrado");
    await detalle.destroy();
    return { mensaje: "Detalle de pedido eliminado con éxito" };
  }
}

export default new DetallePedidoRepository();
