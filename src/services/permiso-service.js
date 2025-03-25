import { PermisoRepository } from "../repositories/permiso-repository.js";

export default class PermisoService {
  constructor() {
    this.permisoRepository = new PermisoRepository();
  }

  async obtenerPermisos() {
    return await this.permisoRepository.obtenerTodos();
  }

  async obtenerPermisoPorId(id) {
    return await this.permisoRepository.obtenerPorId(id);
  }

  async obtenerPermisosPorUsuario(id_usuario) {
    return await this.permisoRepository.obtenerPorUsuario(id_usuario);
  }

  async obtenerPermisosPorRol(id_rol) {
    return await this.permisoRepository.obtenerPorRol(id_rol);
  }

  async crearPermiso(datosPermiso) {
    return await this.permisoRepository.crear(datosPermiso);
  }

  async actualizarPermiso(id, datosActualizados) {
    return await this.permisoRepository.actualizar(id, datosActualizados);
  }

  async eliminarPermiso(id) {
    return await this.permisoRepository.eliminar(id);
  }
}
