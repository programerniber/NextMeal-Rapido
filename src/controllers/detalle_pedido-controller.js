import { DetallePedidoService } from "../services/detalle_pedido-service.js";
import Detalle_Pedido from "../models/detalle_pedido-model.js";
import Pedido from "../models/pedido-model.js";
import Producto from "../models/producto-model.js";

const detallePedidoService = new DetallePedidoService();

export async function obtenerTodosLosDetallesPedido(req, res) {
  try {
    const detalles = await detallePedidoService.obtenerTodosLosDetalles();
    res.status(200).json({ exito: true, data: detalles });
  } catch (error) {
    console.error("Error al obtener detalles del pedido:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function obtenerDetallePedidoPorId(req, res) {
  try {
    const { id } = req.params;
    const detalle = await detallePedidoService.obtenerDetallePorId(id);
    res.status(200).json({ exito: true, data: detalle });
  } catch (error) {
    console.error("Error al obtener detalle de pedido por ID:", error);
    if (error.message === "Detalle de pedido no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function crearDetallePedido(req, res) {
  const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;

  if (!id_pedido || !id_producto || !cantidad || !precio_unitario) {
    return res.status(400).json({
      exito: false,
      mensaje: "Todos los campos son obligatorios: id_pedido, id_producto, cantidad, precio_unitario"
    });
  }

  try {
    const pedidoExistente = await Pedido.findByPk(id_pedido);
    if (!pedidoExistente) {
      return res.status(400).json({
        exito: false,
        mensaje: `El pedido con el id ${id_pedido} no existe`
      });
    }

    const productoExistente = await Producto.findByPk(id_producto);
    if (!productoExistente) {
      return res.status(400).json({
        exito: false,
        mensaje: `El producto con el id ${id_producto} no existe`
      });
    }

    const nuevoDetalle = await Detalle_Pedido.create({
      id_pedido,
      id_producto,
      cantidad,
      precio_unitario,
      subtotal: cantidad * precio_unitario
    });

    res.status(201).json({
      exito: true,
      data: nuevoDetalle,
      mensaje: "Detalle de pedido creado exitosamente",
    });
  } catch (error) {
    console.error("Error al crear detalle de pedido:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function actualizarDetallePedido(req, res) {
  try {
    const { id } = req.params;
    const detalleData = req.body;
    const detalleActualizado = await detallePedidoService.actualizarDetalle(id, detalleData);
    res.status(200).json({ exito: true, data: detalleActualizado });
  } catch (error) {
    console.error("Error al actualizar detalle de pedido:", error);
    if (error.message === "Detalle de pedido no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function eliminarDetallePedido(req, res) {
  try {
    const { id } = req.params;
    const resultado = await detallePedidoService.eliminarDetalle(id);
    res.status(200).json({ exito: true, data: resultado });
  } catch (error) {
    console.error("Error al eliminar detalle de pedido:", error);
    if (error.message === "Detalle de pedido no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}
