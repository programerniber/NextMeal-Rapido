import { VentaRepository } from "../repositories/venta-repository.js";
import Pedido from "../models/pedido-model.js";

export class VentaService {
  constructor() {
    this.ventaRepository = new VentaRepository();
  }

  async obtenerTodos() {
    try {
      const ventas = await this.ventaRepository.obtenerTodos();
      if (ventas.length === 0) {
        throw new Error("No hay ventas registradas.");
      }
      return ventas;
    } catch (error) {
      console.error("Error en servicio obtenerTodos:", error);
      throw error;
    }
  }

  async obtenerPorId(id) {
    try {
      const venta = await this.ventaRepository.obtenerPorId(id);
      if (!venta) {
        throw new Error("Venta no encontrada.");
      }
      return venta;
    } catch (error) {
      console.error("Error en servicio obtenerPorId:", error);
      throw error;
    }
  }

  async crear(ventaData) {
    try {
      
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
    } catch (error) {
      console.error("Error en servicio crear:", error);
      throw error;
    }
  }

  async actualizar(id, ventaData) {
    try {
      
      const venta = await this.ventaRepository.obtenerPorId(id);
      if (!venta) {
        throw new Error("Venta no encontrada.");
      }

     
      if (ventaData.metodo_pago) {
        const metodosValidos = ["efectivo", "transferencia"];
        if (!metodosValidos.includes(ventaData.metodo_pago)) {
          throw new Error("Método de pago no válido.");
        }
      }

      
      return await this.ventaRepository.actualizar(id, ventaData);
    } catch (error) {
      console.error("Error en servicio actualizar:", error);
      throw error;
    }
  }

  async eliminar(id) {
    try {
      const eliminado = await this.ventaRepository.eliminar(id);
      if (!eliminado) {
        throw new Error("No se pudo eliminar la venta.");
      }
      return eliminado;
    } catch (error) {
      console.error("Error en servicio eliminar:", error);
      throw error;
    }
  }

  async actualizarMetodoPago(id, metodoPago) {
    try {
     
      const metodosValidos = ["efectivo", "transferencia"];
      if (!metodosValidos.includes(metodoPago)) {
        throw new Error("Método de pago no válido.");
      }

     
      const ventaActualizada = await this.ventaRepository.actualizarMetodoPago(id, metodoPago);
      if (!ventaActualizada) {
        throw new Error("Venta no encontrada.");
      }
      
      return ventaActualizada;
    } catch (error) {
      console.error("Error en servicio actualizarMetodoPago:", error);
      throw error;
    }
  }
}