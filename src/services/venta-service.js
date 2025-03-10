import { VentaRepository } from "../repositories/venta-repository.js";
import Pedido from "../models/pedido-model.js";

export class VentaService {
  constructor() {
    this.ventaRepository = new VentaRepository();
  }

  async obtenerTodos() {
    const ventas = await this.ventaRepository.obtenerTodos();
    if (ventas.length === 0) {
      throw new Error("No hay ventas registradas.");
    }
    return ventas;
  }

  async crear(ventaData) {
    
    const pedido = await Pedido.findByPk(ventaData.id_pedido);
    if (!pedido) {
      throw new Error("El pedido no existe.");
    }

    ventaData.total_pagar = pedido.total;
    
    if (ventaData.total_pagar <= 0) {
      throw new Error("El total de la venta debe ser mayor a 0.");
    }


    const metodosValidos = ["efectivo", "transferencia"];
    if (!metodosValidos.includes(ventaData.metodo_pago)) {
      throw new Error("Método de pago no válido.");
    }

    return await this.ventaRepository.crear(ventaData);
  }

  async actualizar(id, ventaData) {
    const venta = await this.ventaRepository.obtenerPorId(id);
    if (!venta) {
      throw new Error("Venta no encontrada.");
    }

    return await this.ventaRepository.actualizar(id, ventaData);
  }

  async eliminar(id) {
    const eliminado = await this.ventaRepository.eliminar(id);
    if (!eliminado) {
      throw new Error("No se pudo eliminar la venta.");
    }
    return eliminado;
  }
}
