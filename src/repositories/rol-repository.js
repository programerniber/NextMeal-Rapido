import Rol from "../models/rol-model.js";

export class RolRepository {
  async obtenerTodosLosRoles() {
    return await Rol.findAll();
  }

  async obtenerRolPorId(id) {
    return await Rol.findByPk(id);
  }

  async crearRol(rolData) {
    return await Rol.create(rolData);
  }

  async actualizarRol(id, rolData) {
    const rol = await this.obtenerRolPorId(id);
    if (!rol) throw new Error("Rol no encontrado");
    return await rol.update(rolData);
  }

  async eliminarRol(id) {
    const rol = await this.obtenerRolPorId(id);
    if (!rol) throw new Error("Rol no encontrado");
    await rol.destroy();
    return { mensaje: "Rol eliminado exitosamente" };
  }
}
