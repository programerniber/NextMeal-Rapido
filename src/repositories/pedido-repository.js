import Pedido from '../models/pedido-model';
import Cliente from '../models/cliente-model.js';

export class PedidoRepository {
    async obtenerTodos() {
      return await Pedido.findAll({
        include: [
          {
            model: Cliente,
            attributes: ["nombreCompleto"], 
          },
        ],
        order: [["id", "DESC"]],
      });
    }
  
    async obtenerPorId(id) {
      return await Pedido.findByPk(id, {
        include: [
          {
            model: Cliente,
            attributes: ["nombreCompleto"],
          },
        ],
      });
    }
  
    async crear(pedidoData) {
      return await Pedido.create(pedidoData);
    }
  
    async actualizar(id, pedidoData) {
      const pedido = await Pedido.findByPk(id);
      if (!pedido) return null;
  
      return await pedido.update(pedidoData);
    }
  
    async eliminar(id) {
      const pedido = await Pedido.findByPk(id);
      if (!pedido) return false;
  
      await pedido.destroy();
      return true;
    }
  
    async actualizarEstado(id, nuevoEstado) {
      const pedido = await Pedido.findByPk(id);
      if (!pedido) return null;
  
      if (!["pendiente", "preparacion", "listo", "entregado", "cancelado"].includes(nuevoEstado)) {
        throw new Error("Estado no válido");
      }
  
      return await pedido.update({ estado: nuevoEstado });
    }
  }
  