import { VentaService } from "../services/venta-service.js";

const ventaService = new VentaService();

export async function obtenerVentas(req, res) {
  try {
    const ventas = await ventaService.obtenerTodos();
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ventas", error: error.message });
  }
}

export async function obtenerVentaPorId(req, res) {
  try {
    const { id } = req.params;
    const venta = await ventaService.obtenerPorId(id);
    if (!venta) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }
    res.status(200).json(venta);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la venta", error: error.message });
  }
}
 
export async function crearVenta(req, res) {
  try {
    const nuevaVenta = await ventaService.crear(req.body);
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear la venta", error: error.message });
  }
}

export async function actualizarVenta(req, res) {
  try {
    const { id } = req.params;
    const ventaActualizada = await ventaService.actualizar(id, req.body);
    if (!ventaActualizada) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }
    res.status(200).json(ventaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la venta", error: error.message });
  }
}

export async function eliminarVenta(req, res) {
  try {
    const { id } = req.params;
    const eliminada = await ventaService.eliminar(id);
    if (!eliminada) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }
    res.status(200).json({ mensaje: "Venta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la venta", error: error.message });
  }
}

export async function actualizarMetodoPago(req, res) {
  try {
    const { id } = req.params;
    const { metodo_pago } = req.body;
    const metodosValidos = ["efectivo", "transferencia"];

    if (!metodosValidos.includes(metodo_pago)) {
      return res.status(400).json({ mensaje: "Método de pago no válido" });
    }

    const ventaActualizada = await ventaService.actualizarMetodoPago(id, metodo_pago);
    if (!ventaActualizada) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }

    res.status(200).json(ventaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el método de pago", error: error.message });
  }
}
