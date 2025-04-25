import Permiso from "../models/permiso-model.js"
import Rol from "../models/rol-model.js"

export class PermisoRepository {
  async obtenerTodosLosPermisos() {
    return await Permiso.findAll()
  }

  async obtenerPermisoPorId(id) {
    return await Permiso.findByPk(id)
  }

  async crearPermiso(permisoData) {
    return await Permiso.create(permisoData)
  }

  async actualizarPermiso(id, permisoData) {
    const permiso = await Permiso.findByPk(id)
    if (!permiso) return null
    await permiso.update(permisoData)
    return permiso
  }

  async eliminarPermiso(id) {
    const permiso = await Permiso.findByPk(id)
    if (!permiso) return false
    await permiso.destroy()
    return true
  }
  async obtenerPermisosPorRol(idRol) {
    const rol = await Rol.findByPk(idRol, {
      include: {
        model: Permiso,
        through: { attributes: [] }, // Para no incluir los datos de la tabla intermedia
      },
    })

    return rol?.Permisos || []
  }

}
