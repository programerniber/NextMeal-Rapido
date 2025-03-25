import Venta from "../models/venta-model.js";
import Pedido from "../models/pedido-model.js";
import Cliente from "../models/cliente-model.js";
import Producto from "../models/poductos-model.js";

export class VentaRepository {
  async obtenerTodos() {
    return await Venta.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["nombrecompleto"], 
        },
        {
          model: Producto,
          attributes: ["nombre", "precio","cantidad"] 
        },
        {
          model: Pedido,
          attributes: ["estado"]

        }
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
          model: Producto,
          attributes: ["nombre", "precio","cantidad"]
        },
        {
          model: Pedido,
          attributes: ["estado"]

        }

      ],
    });
  }

  async crear(ventaData) {
    const pedido = await Pedido.findByPk(ventaData.id_pedido);
    if (!pedido) {
      throw new Error("El pedido no existe.");
    }

    if (pedido.estado !== "terminado") {
      throw new Error("No se puede realizar la venta. El pedido no está terminado.");
    }

    const nuevaVenta = await Venta.create(ventaData);

    return await this.obtenerPorId(nuevaVenta.id);
}


  async actualizar(id, ventaData) {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;
    
    await venta.update(ventaData);
    return await this.obtenerPorId(id);
  }

  async eliminar(id) {
    const venta = await Venta.findByPk(id);
    if (!venta) return false;
    
    
    if (venta.id_pedido) {
      const pedido = await Pedido.findByPk(venta.id_pedido);
      if (pedido) {
        await pedido.update({ estado: "preparacion" });
      }
    }
    
    await venta.destroy();
    return true;
  }
  
  async actualizarMetodoPago(id, metodoPago) {
    const venta = await Venta.findByPk(id);
    if (!venta) return null;
    
    await venta.update({ metodo_pago: metodoPago });
    return await this.obtenerPorId(id);
  }
}