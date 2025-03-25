import Pedido from "../models/pedido-model.js";
import Cliente from "../models/cliente-model.js";
import Producto from "../models/poductos-model.js";

export class PedidoService {
  
  async obtenerTodos() {
    return await Pedido.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombrecompleto"],
        },
        {
          model: Producto,
          attributes: ["nombre", "precio"],
        },
      ],
      order: [["id", "DESC"]],
    });
  }

  async obtenerPorId(id) {
    const pedido = await Pedido.findByPk(id, {
      include: [
        {
          model: Cliente,
          attributes: ["nombrecompleto"],
        },
        {
          model: Producto,
          attributes: ["nombre", "precio"],
        },
      ],
    });
    if (!pedido) throw new Error("Pedido no encontrado");
    return pedido;
  }

  async crearpedidos(pedidoData) {
    return await Pedido.create(pedidoData);
  }

  async actualizarpedidos(id, pedidoData) {
    const pedido = await this.obtenerPorId(id);
    return await pedido.update(pedidoData);
  }

  async eliminarpedidos(id) {
    const pedido = await this.obtenerPorId(id);
    
    if (pedido.estado === "terminado") {
      throw new Error("No se puede eliminar un pedido que ya fue entregado");
    }

    await pedido.destroy();
    return { mensaje: "Pedido eliminado exitosamente" };
  }

  async cambiarEstadopedidos(id, estado) {
    const pedido = await this.obtenerPorId(id);

    const estadosValidos = ["pendiente", "preparacion", "terminado", "cancelado"];
    if (!estadosValidos.includes(estado)) {
      throw new Error("Estado no válido");
    }

    return await pedido.update({ estado });
  }
}
