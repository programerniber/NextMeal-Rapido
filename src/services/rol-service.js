import { RolRepository } from "../repositories/rol-repository.js";

export class RolService {
  constructor() {
    this.rolRepository = new RolRepository();
  }

  async obtenerTodosLosRoles() {
    return await this.rolRepository.obtenerTodosLosRoles();
  }

  async obtenerRolPorId(id) {
    const rol = await this.rolRepository.obtenerRolPorId(id);
    if (!rol) throw new Error("Rol no encontrado");
    return rol;
  }

  async crearRol(rolData) {
    return await this.rolRepository.crearRol(rolData);
  }

  async actualizarRol(id, rolData) {
    return await this.rolRepository.actualizarRol(id, rolData);
  }

  async eliminarRol(id) {
    return await this.rolRepository.eliminarRol(id);
  }
}
