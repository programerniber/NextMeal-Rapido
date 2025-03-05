import {PedidoService}  from "../services/pedido-service.js";
import Pedido from "../models/pedido-model.js";
import Cliente from "../models/cliente-model.js";

const pedidoService = new PedidoService(); 

export async function obtenerTodosLosPedidos(req, res) {
  try {
    const pedidos = await pedidoService.obtenerTodosLosPedidos();
    res.status(200).json({ exito: true, data: pedidos });
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
    console.log(error)
  }
} 
 
export async function obtenerPedidoPorId(req, res) {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.obtenerPedidoPorId(id);
    res.status(200).json({ exito: true, data: pedido });
  } catch (error) { 
    console.error("Error al obtener pedido por ID:", error);
    if (error.message === "Pedido no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}  

export async function crearPedido(req, res) {
  const { id_cliente, fecha_pedido, total, metodo_pago, direccion_envio } = req.body;

  
  if (!id_cliente || !total || !metodo_pago || !direccion_envio) {
    return res.status(400).json({ 
      exito: false, 
      mensaje: "Todos los campos son obligatorios: id_cliente, total, metodo_pago, direccion_envio"
    });
  }

  try {
  
    const clienteExistente = await Cliente.findByPk(id_cliente);
    if (!clienteExistente) {
      return res.status(400).json({
        exito: false,
        mensaje: `El cliente con el id ${id_cliente} no existe`
      });
    }

    
    const nuevoPedido = await Pedido.create({
      id_cliente,
      total,
      metodo_pago,
      direccion_envio,
    });

    
    res.status(201).json({
      exito: true,
      data: nuevoPedido,
      mensaje: "Pedido creado exitosamente",
    });

  } catch (error) {
    // Agregar más detalles al mensaje de error para depurar
    console.error("Error al crear pedido:", error);

  
   const errorMessage = error.message || "Error interno del servidor";

    res.status(500).json({
      exito: false,
      mensaje: `Error al crear pedido: ${errorMessage}`,
    });
  }
} 

export async function actualizarPedido(req, res) {
  try {
    const { id } = req.params;
    const pedidoData = req.body;
    const pedidoActualizado = await pedidoService.actualizarPedido(id, pedidoData);
    res.status(200).json({ exito: true, data: pedidoActualizado });
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    if (error.message === "Pedido no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function eliminarPedido(req, res) {
  try {
    const { id } = req.params;
    const resultado = await pedidoService.eliminarPedido(id);
    res.status(200).json({ exito: true, data: resultado });
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    if (error.message === "Pedido no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function cambiarEstadoPedido(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const pedidoActualizado = await pedidoService.cambiarEstadoPedido(id, estado);
    res.status(200).json({ exito: true, data: pedidoActualizado });
  } catch (error) {
    console.error("Error al cambiar estado del pedido:", error);
    if (error.message === "Pedido no encontrado") {
      return res.status(404).json({ exito: false, mensaje: error.message });
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}
