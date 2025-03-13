import { PedidoService } from "../services/pedido-service.js"

const pedidoService = new PedidoService()

export async function obtenerTodos(req, res) {
  try {
    const pedidos = await pedidoService.obtenerTodos()
    res.status(200).json({
      exito: true,
      data: pedidos,
    })
  } catch (error) {
    console.error("Error al obtener pedidos:", error)
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener pedidos",
      error: error.message,
    })
  }
}

export async function obtenerPorId(req, res) {
  try {
    const { id } = req.params
    const pedido = await pedidoService.obtenerPorId(id)

    if (!pedido) {
      return res.status(404).json({
        exito: false,
        mensaje: "Pedido no encontrado",
      })
    }

    res.status(200).json({
      exito: true,
      data: pedido,
    })
  } catch (error) {
    console.error("Error al obtener pedido por ID:", error)
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener el pedido",
      error: error.message,
    })
  }
}

export async function crearpedidos(req, res) {
  try {
    const pedidoData = req.body

    // Agregar información del usuario que crea el pedido
    pedidoData.creadoPor = req.usuario.id

    const nuevoPedido = await pedidoService.crearpedidos(pedidoData)
    res.status(201).json({
      exito: true,
      data: nuevoPedido,
      mensaje: "Pedido creado exitosamente",
    })
  } catch (error) {
    console.error("Error al crear pedido:", error)
    res.status(400).json({
      exito: false,
      mensaje: "Error al crear el pedido",
      error: error.message,
    })
  }
}

export async function actualizarpedidos(req, res) {
  try {
    const { id } = req.params
    const pedidoData = req.body

    // Agregar información del usuario que actualiza el pedido
    pedidoData.actualizadoPor = req.usuario.id

    const pedidoActualizado = await pedidoService.actualizarpedidos(id, pedidoData)

    if (!pedidoActualizado) {
      return res.status(404).json({
        exito: false,
        mensaje: "Pedido no encontrado",
      })
    }

    res.status(200).json({
      exito: true,
      data: pedidoActualizado,
      mensaje: "Pedido actualizado exitosamente",
    })
  } catch (error) {
    console.error("Error al actualizar pedido:", error)
    res.status(400).json({
      exito: false,
      mensaje: "Error al actualizar el pedido",
      error: error.message,
    })
  }
}

export async function eliminarpedidos(req, res) {
  try {
    const { id } = req.params

    // Verificar si el pedido existe
    const pedido = await pedidoService.obtenerPorId(id)

    if (!pedido) {
      return res.status(404).json({
        exito: false,
        mensaje: "Pedido no encontrado",
      })
    }

    // Verificar si el pedido ya fue entregado
    if (pedido.estado === "entregado") {
      return res.status(400).json({
        exito: false,
        mensaje: "No se puede eliminar un pedido que ya fue entregado",
      })
    }

    const resultado = await pedidoService.eliminarpedidos(id)
    res.status(200).json({
      exito: true,
      data: resultado,
      mensaje: "Pedido eliminado exitosamente",
    })
  } catch (error) {
    console.error("Error al eliminar pedido:", error)
    res.status(500).json({
      exito: false,
      mensaje: "Error al eliminar el pedido",
      error: error.message,
    })
  }
}

export async function cambiarEstadopedidos(req, res) {
  try {
    const { id } = req.params
    const { estado } = req.body

    // Validar que el estado sea válido
    const estadosValidos = ["pendiente", "preparacion", "entregado", "cancelado"]
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        exito: false,
        mensaje: `Estado inválido. Debe ser uno de: ${estadosValidos.join(", ")}`,
      })
    }

    const pedidoActualizado = await pedidoService.cambiarEstadopedidos(id, estado)

    if (!pedidoActualizado) {
      return res.status(404).json({
        exito: false,
        mensaje: "Pedido no encontrado",
      })
    }

    res.status(200).json({
      exito: true,
      data: pedidoActualizado,
      mensaje: `Estado del pedido actualizado a '${estado}'`,
    })
  } catch (error) {
    console.error("Error al cambiar estado del pedido:", error)
    res.status(400).json({
      exito: false,
      mensaje: "Error al cambiar estado del pedido",
      error: error.message,
    })
  }
}

