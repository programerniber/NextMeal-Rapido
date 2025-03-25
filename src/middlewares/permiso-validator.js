import Permiso from "../models/permiso-model.js"
import Usuario from "../models/usuario-model.js"
import Rol from "../models/rol-model.js"

// Middleware para verificar permisos
export const verificarPermiso = (recurso, accion) => {
  return async (req, res, next) => {
    try {
      const usuarioId = req.usuario?.id;

      if (!usuarioId) {
        return res.status(401).json({
          exito: false,
          mensaje: "No autorizado. Usuario no identificado.",
        });
      }

      const usuario = await Usuario.findOne({
        where: { id: usuarioId },
        include: [{ model: Rol, attributes: ["nombre"] }],
      });

      if (!usuario || !usuario.Rol) {
        return res.status(403).json({
          exito: false,
          mensaje: "Acceso denegado. Usuario o rol no encontrado.",
        });
      }

      // ✅ Permitir acceso a administradores
      if (usuario.Rol.nombre === "administrador") {
        return next();
      }

      // ✅ Permitir acceso a empleados solo para estos recursos
      if (usuario.Rol.nombre === "empleado") {
        const permiso = await Permiso.findOne({
          where: {
            id_usuario: usuarioId,
            recurso,
            accion,
            activo: true,
          },
        });

        if (permiso) {
          return next();
        } else {
          return res.status(403).json({
            exito: false,
            mensaje: `Acceso denegado. No tienes permiso para ${accion} en ${recurso}.`,
          });
        }
      }

      return res.status(403).json({
        exito: false,
        mensaje: "Acceso denegado. Rol no autorizado.",
      });
    } catch (error) {
      console.error("Error al verificar permisos:", error);
      return res.status(500).json({
        exito: false,
        mensaje: "Error interno al verificar permisos.",
        error: error.message,
      });
    }
  };
};