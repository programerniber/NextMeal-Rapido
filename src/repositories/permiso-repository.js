import Permiso from "../models/permiso-model.js";

class PermisoRepository {
  async obtenerTodos() {
    return await Permiso.findAll();
  }

  async obtenerPorId(id) {
    return await Permiso.findByPk(id);
  }

  async crear(datosPermiso) {
    return await Permiso.create(datosPermiso);
  }

  async actualizar(id, datosActualizados) {
    const permiso = await Permiso.findByPk(id);
    if (!permiso) return null;
    return await permiso.update(datosActualizados);
  }

  async eliminar(id) {
    const permiso = await Permiso.findByPk(id);
    if (!permiso) return null;
    await permiso.destroy();
    return true;
  }

  async obtenerPorUsuario(id_usuario) {
    return await Permiso.findAll({ where: { id_usuario } });
  }
}

// ⚠️ Aquí exportamos directamente la CLASE, no una instancia.
export { PermisoRepository };
