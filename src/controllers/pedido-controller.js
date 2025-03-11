import { PedidoService } from "../services/pedido-service.js";

const pedidoService = new PedidoService();

  export async function obtenerTodos(req, res) {
    try {
      const pedidos = await pedidoService.obtenerTodos();
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener pedidos", error: error.message });
    }
  }

  export async function obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const pedido = await pedidoService.obtenerPorId(id);
      res.status(200).json(pedido);
    } catch (error) {
      res.status(404).json({ mensaje: "Pedido no encontrado", error: error.message });
    }
  }

  export async function crearpedidos(req, res) {
    try {
      const pedido = await pedidoService.crearpedidos(req.body);
      res.status(201).json(pedido);
    } catch (error) {
      res.status(400).json({ mensaje: "Error al crear el pedido", error: error.message });
    }
  }

  export async function actualizarpedidos(req, res) {
    try {
      const { id } = req.params;
      const pedidoActualizado = await pedidoService.actualizarpedidos(id, req.body);
      res.status(200).json(pedidoActualizado);
    } catch (error) {
      res.status(400).json({ mensaje: "Error al actualizar el pedido", error: error.message });
    }
  }

  export async function eliminarpedidos(req, res) {
    try {
      const { id } = req.params;
  
      
      const pedido = await pedidoService.obtenerPorId(id);
      
      if (!pedido) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
      }
  
      if (pedido.estado === "entregado") {
        return res.status(400).json({ mensaje: "No se puede eliminar un pedido que ya fue entregado" });
      }
  
      
      const resultado = await pedidoService.eliminarpedidos(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar el pedido", error: error.message });
    }
  }

  export async function cambiarEstadopedidos(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      const pedidoActualizado = await pedidoService.cambiarEstadopedidos(id, estado);
      res.status(200).json(pedidoActualizado);
    } catch (error) {
      res.status(400).json({ mensaje: "Error al cambiar estado del pedido", error: error.message });
    }
  }

