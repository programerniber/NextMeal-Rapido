import { sequelize } from "../config/database.js"
import Permiso from "../models/permiso-model.js" 
import Rol from "../models/rol-model.js"
import PermisoRol from "../models/permiso-rol-model.js" // Corregida la importación

export class RolService {
  async obtenerTodosLosRoles() {
    return await Rol.findAll({
      include: [
        {
          model: Permiso,
          attributes: ["id", "recurso", "accion", "activo"],
        },
      ],
    })
  }
  
  async obtenerRolesConPermisos() {
    return await this.obtenerTodosLosRoles();
  }
  
  async obtenerRolPorId(id) {
    return await Rol.findByPk(id, {
      include: [
        {
          model: Permiso,
          attributes: ["id", "recurso", "accion", "activo"],
        },
      ],
    })
  }

  async crearRol(rolData) {
    const { nombre, permisos } = rolData;
    const transaction = await sequelize.transaction();

    try {
      // Crear el rol
      const nuevoRol = await Rol.create({ nombre }, { transaction });

      // Asociar permisos existentes al nuevo rol
      for (const permisoId of permisos) {
        await PermisoRol.create(
          { rol_id: nuevoRol.id, permiso_id: permisoId },
          { transaction }
        );
      }

      await transaction.commit();
      return await this.obtenerRolPorId(nuevoRol.id);
    } catch (error) {
      if (transaction && !transaction.finished) await transaction.rollback();
      throw new Error("Error al crear el rol: " + error.message);
    }
  }

  async actualizarRol(id, rolData) {
    let transaction;

    try {
      transaction = await sequelize.transaction();
      const rol = await Rol.findByPk(id, { transaction });

      if (!rol) throw new Error("Rol no encontrado para actualizar");

      // Actualizar los datos básicos del rol
      if (rolData.nombre) {
        await rol.update({ nombre: rolData.nombre }, { transaction });
      }

      // Si se proporcionan datos de permiso, actualizamos o creamos el permiso
      if (rolData.recurso && rolData.accion) {
        // Buscar si ya existe un permiso asociado con este recurso y acción
        let permiso = await Permiso.findOne({
          where: { 
            recurso: rolData.recurso,
            accion: rolData.accion
          }
        }, { transaction });
        
        if (!permiso) {
          // Si no existe el permiso, lo creamos
          permiso = await Permiso.create({
            recurso: rolData.recurso,
            accion: rolData.accion,
            activo: rolData.activo !== undefined ? rolData.activo : true
          }, { transaction });
        }
        
        // Verificar si ya existe la relación
        const permisoRolExistente = await PermisoRol.findOne({
          where: {
            rol_id: rol.id,
            permiso_id: permiso.id
          }
        }, { transaction });
        
        // Si no existe la relación, la creamos
        if (!permisoRolExistente) {
          await PermisoRol.create({
            rol_id: rol.id,
            permiso_id: permiso.id
          }, { transaction });
        }
      }

      await transaction.commit();
      return await this.obtenerRolPorId(id);
    } catch (error) {
      if (transaction && !transaction.finished) await transaction.rollback();
      throw error;
    }
  }
  
  async eliminarRol(id) {
    const rol = await this.obtenerRolPorId(id);
    if (!rol) return null;

    await PermisoRol.destroy({ where: { rol_id: id } }); // Corregido permiso_id a rol_id
    await Rol.destroy({ where: { id } });
    return { mensaje: "Rol eliminado exitosamente" };
  }
}