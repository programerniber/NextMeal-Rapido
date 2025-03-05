import DetallePedido from "../models/detalle_pedido-model.js";
import Pedido from "../models/pedido-model.js";
import Producto from "../models/producto-model.js";

export class DetallePedidoService {
    
  async obtenerTodosLosDetalles() {
    
    return await DetallePedido.findAll({
      include: [
        {
          model: Pedido,
          attributes: ["estado"],
        },
        {
          model: Producto,
          attributes: ["nombre"],
        },
      ],
      order: [["id", "DESC"]],
    });
  }

  async obtenerDetallePorId(id) {
    const detalle = await DetallePedido.findByPk(id, {
      include: [
        {
          model: Pedido,
          attributes: ["estado"],
        },
        {
          model: Producto,
          attributes: ["nombre"],
        },
      ],
    });
    if (!detalle) throw new Error("Detalle de pedido no encontrado");
    return detalle;
  }

  async crearDetallePedido(detalleData) {
    return await DetallePedido.create(detalleData);
  }

  async actualizarDetallePedido(id, detalleData) {
    const detalle = await this.obtenerDetallePorId(id);
    return await detalle.update(detalleData);
  }

  async eliminarDetallePedido(id) {
    const detalle = await this.obtenerDetallePorId(id);
    await detalle.destroy();
    return { mensaje: "Detalle de pedido eliminado exitosamente" };
  }
}

export default new DetallePedidoService();