import Venta from "../models/venta-model.js";
import Cliente from "../models/cliente-model.js";
import Pedido from "../models/pedido-model.js";

export class VentaRepository {
  async obtenerTodos() {
    return await Venta.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombrecompleto"], 
        },
        {
          model: Pedido,
          attributes: ["id", "total"], 
        },
      ],
      order: [["id", "DESC"]],
    });
  }

  async obtenerPorId(id) {
    return await Venta.findByPk(id, {
      include: [
        {
          model: Cliente,
          attributes: ["nombrecompleto"],
        },
        {
          model: Pedido,
          attributes: ["id", "total"],
        },
      ],
    });
  }

  async crear(ventaData) {
    return await Venta.create(ventaData);
  }

  async actualizar(id, ventaData) {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;
    return await venta.update(ventaData);
  }

  async eliminar(id) {
    const venta = await Venta.findByPk(id);
    if (!venta) return false;
    await venta.destroy();
    return true;
  }
}
