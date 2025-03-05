import Pedido from "../models/pedido-model.js";
import Cliente from "../models/cliente-model.js";

export class PedidoService {
  async obtenerTodosLosPedidos() {
    return await Pedido.findAll({
      
      include: {
        model: Cliente,
        attributes: ["nombreCompleto"], 
      },
      order: [["id", "DESC"]],
    });
  }
 
  async obtenerPedidoPorId(id) {
    const pedido = await Pedido.findByPk(id, {
      include: {
        model: Cliente,
        attributes: ["nombreCompleto"],
      },
    });
    if (!pedido) throw new Error("Pedido no encontrado");
    return pedido;
  }

  async crearPedido(pedidoData) {
    return await Pedido.create(pedidoData); 
  }

  async actualizarPedido(id, pedidoData) {
    const pedido = await this.obtenerPedidoPorId(id);
    return await pedido.update(pedidoData);
  }

  async eliminarPedido(id) {
    const pedido = await this.obtenerPedidoPorId(id);
    await pedido.destroy();
    return { mensaje: "Pedido eliminado exitosamente" };
  }

  async cambiarEstadoPedido(id, estado) {
    const pedido = await this.obtenerPedidoPorId(id);
    return await pedido.update({ estado });
  }
}
 