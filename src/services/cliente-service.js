import { ClienteRepository } from "../repositories/cliente.repository.js"

export class ClienteService {
  constructor() {
    this.clienteRepository = new ClienteRepository()
  }

  async obtenerTodosLosClientes() {
    return await this.clienteRepository.obtenerTodos()
  }

  async obtenerClientePorId(id) {
    const cliente = await this.clienteRepository.obtenerPorId(id)
    if (!cliente) {
      throw new Error("Cliente no encontrado")
    }
    return cliente
  }

  async crearCliente(clienteData) {
    const existeEmail = await this.clienteRepository.obtenerPorEmail(clienteData.correoElectronico)
    if (existeEmail) {
      throw new Error("Ya existe un cliente con este correo electrónico")
    }

    const existeDocumento = await this.clienteRepository.obtenerPorDocumento(clienteData.documentoIdentidad)
    if (existeDocumento) {
      throw new Error("Ya existe un cliente con este documento de identidad")
    }

    return await this.clienteRepository.crear(clienteData)
  }

  async actualizarCliente(id, clienteData) {
    if (clienteData.correoElectronico) {
      const existeEmail = await this.clienteRepository.obtenerPorEmail(clienteData.correoElectronico)
      if (existeEmail && existeEmail.id !== Number.parseInt(id)) {
        throw new Error("Ya existe un cliente con este correo electrónico")
      }
    }

    if (clienteData.documentoIdentidad) {
      const existeDocumento = await this.clienteRepository.obtenerPorDocumento(clienteData.documentoIdentidad)
      if (existeDocumento && existeDocumento.id !== Number.parseInt(id)) {
        throw new Error("Ya existe un cliente con este documento de identidad")
      }
    }

    const clienteActualizado = await this.clienteRepository.actualizar(id, clienteData)
    if (!clienteActualizado) {
      throw new Error("Cliente no encontrado")
    }

    return clienteActualizado
  }

  async eliminarCliente(id) {
    const resultado = await this.clienteRepository.eliminar(id)
    if (!resultado) {
      throw new Error("Cliente no encontrado")
    }
    return { mensaje: "Cliente eliminado correctamente" }
  }

  async cambiarEstadoCliente(id, estado) {
    if (estado !== "Activo" && estado !== "Inactivo") {
      throw new Error("Estado inválido. Debe ser 'Activo' o 'Inactivo'")
    }

    const clienteActualizado = await this.clienteRepository.cambiarEstado(id, estado)
    if (!clienteActualizado) {
      throw new Error("Cliente no encontrado")
    }

    return clienteActualizado
  }
}

