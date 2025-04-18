import Pedido from "../models/pedido-model.js";
import Cliente from "../models/cliente-model.js";
import Producto from "../models/poductos-model.js";
import PedidoProducto from "../models/pedido-producto-model.js";
import { sequelize } from "../config/database.js";

export class PedidoService {
  async obtenerTodos() {
    return await Pedido.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombrecompleto","telefono"],
        },
        {
          model: Producto,
          attributes: ["id", "nombre", "precio"],
          through: {
            model: PedidoProducto,
            as: "PedidoProducto", // 👈 Esto es importante
            attributes: ["id", "cantidad", "precio_unitario", "subtotal"]
          }
        }
      ],
      order: [["id", "DESC"]],
    });
  }

  async obtenerPorId(id) {
    const pedido = await Pedido.findByPk(id, {
      include: [
        {
          model: Cliente,
          attributes: ["nombrecompleto","telefono"],
        },
        {
          model: Producto,
          attributes: ["id", "nombre", "precio"],
          through: {
            model: PedidoProducto,
            as: "PedidoProductos", // 👈 Esto es importante
            attributes: ["id", "cantidad", "precio_unitario", "subtotal"]
          }
        }
      ],
    });
    if (!pedido) throw new Error("Pedido no encontrado");
    return pedido;
  }

  async crearpedidos(pedidoData) {
    const { productos, ...datosPedido } = pedidoData;
  
    // Validación de productos
    if (!productos?.length) {
      throw new Error("Debe incluir al menos un producto");
    }
  
    let transaction;
    try {
      transaction = await sequelize.transaction();
  
      // Crear pedido
      const pedido = await Pedido.create(datosPedido, { transaction });
  
      // Procesar productos
      for (const p of productos) {
        const producto = await Producto.findByPk(p.producto_id, { transaction });
        if (!producto) throw new Error(`Producto ${p.producto_id} no encontrado`);
  
        await PedidoProducto.create(
          {
            pedido_id: pedido.id,
            producto_id: p.producto_id,
            cantidad: p.cantidad,
            precio_unitario: producto.precio,
            subtotal: p.cantidad * producto.precio,
          },
          { transaction }
        );
      }
  
      // Calcular total
      const total = await PedidoProducto.sum("subtotal", {
        where: { pedido_id: pedido.id },
        transaction,
      });
  
      await pedido.update({ total }, { transaction });
      await transaction.commit();
  
      return pedido;
    } catch (error) {
      if (transaction && !transaction.finished) {
        await transaction.rollback();
      }
      throw error;
    }
  }
  
  async actualizarpedidos(id, pedidoData) {
    // Mantenemos el nombre original
    const { productos, ...datosPedido } = pedidoData;
    const pedido = await this.obtenerPorId(id);

    await pedido.update(datosPedido);

    if (productos && Array.isArray(productos)) {
      await PedidoProducto.destroy({ where: { pedido_id: id } });
      await pedido.setProductos(productos);
      await pedido.calcularTotal();
    }

    return await this.obtenerPorId(id);
  }

  async eliminarpedidos(id) {
    // Mantenemos el nombre original
    const pedido = await this.obtenerPorId(id);

    if (pedido.estado === "terminado") {
      throw new Error("No se puede eliminar un pedido que ya fue entregado");
    }

    await PedidoProducto.destroy({ where: { pedido_id: id } });
    await pedido.destroy();
    return { mensaje: "Pedido eliminado exitosamente" };
  }

  async cambiarEstadopedidos(id, estado) {
    // Mantenemos el nombre original
    const pedido = await this.obtenerPorId(id);

    const estadosValidos = [
      "pendiente",
      "preparacion",
      "terminado",
      "cancelado",
    ];
    if (!estadosValidos.includes(estado)) {
      throw new Error("Estado no válido");
    }

    return await pedido.update({ estado });
  }
}
