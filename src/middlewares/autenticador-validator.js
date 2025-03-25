import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { RolRepository } from "../repositories/rol-repository.js"
import { PermisoRepository } from "../repositories/permiso-repository.js"

const ROL = new RolRepository()
const permisoRepository = new PermisoRepository()

// Cargar variables de entorno
dotenv.config()

// Obtener JWT_SECRET de las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET

// Verificar que JWT_SECRET esté definido
if (!JWT_SECRET) {
  console.error("ERROR: JWT_SECRET no está definido en las variables de entorno.")
  process.exit(1) // Detener la aplicación si falta esta variable crítica
}

export const autenticar = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ exito: false, mensaje: "Acceso denegado, token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    
    // Cargar permisos del usuario si no están en el token
    if (!req.usuario.permisos) {
      const permisos = await permisoRepository.obtenerPorUsuario(req.usuario.id);
      req.usuario.permisos = permisos.map(p => ({
        recurso: p.recurso,
        accion: p.accion
      }));
    }
    
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    return res.status(403).json({ exito: false, mensaje: "Token inválido o expirado" });
  }
};

export const autorizarRol = (roles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.usuario) {
        return res.status(403).json({
          exito: false,
          mensaje: "Acceso denegado. Usuario no autenticado",
        });
      }

      // Obtener el rol del usuario
      const rol = await ROL.obtenerRolPorId(req.usuario.id_rol);

      if (!rol || !rol.nombre) {
        return res.status(403).json({
          exito: false,
          mensaje: "Acceso denegado. No se pudo determinar el rol del usuario.",
        });
      }

      const rolNombre = rol.nombre.toLowerCase();
      const rolesPermitidos = roles.map(r => r.toLowerCase());

      // Verificar si el usuario tiene el rol permitido
      if (roles.length === 0 || rolesPermitidos.includes(rolNombre)) {
        return next();
      }

      return res.status(403).json({
        exito: false,
        mensaje: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(", ")}`,
        rolActual: rolNombre,
      });

    } catch (error) {
      console.error("Error en la autorización:", error);
      return res.status(500).json({
        exito: false,
        mensaje: "Error interno en la autorización.",
      });
    }
  };
};

// Nuevo middleware para verificar permisos específicos
export const verificarPermiso = (recurso, accion) => {
  return async (req, res, next) => {
    try {
      if (!req.usuario) {
        return res.status(403).json({
          exito: false,
          mensaje: "Acceso denegado. Usuario no autenticado",
        });
      }

      // Obtener el rol del usuario
      const rol = await ROL.obtenerRolPorId(req.usuario.id_rol);
      const rolNombre = rol.nombre.toLowerCase();

      // Si es administrador, permitir acceso sin verificar permisos
      if (rolNombre === "administrador") {
        return next();
      }

      // Verificar si el usuario tiene el permiso específico
      const permisos = req.usuario.permisos || [];
      
      console.log("Verificando permiso:", recurso, accion);
      console.log("Permisos del usuario:", permisos);
      
      const tienePermiso = permisos.some(
        p => p.recurso === recurso && p.accion === accion
      );

      if (tienePermiso) {
        return next();
      }

      return res.status(403).json({
        exito: false,
        mensaje: `Acceso denegado. Se requiere permiso para ${recurso}:${accion}`,
        rolActual: rolNombre,
      });

    } catch (error) {
      console.error("Error en la verificación de permisos:", error);
      return res.status(500).json({
        exito: false,
        mensaje: "Error interno en la verificación de permisos.",
      });
    }
  };
};

export const autorizarAdmin = (req, res, next) => {
  return autorizarRol(["administrador"])(req, res, next)
}

// Middleware para autorizar administradores o empleados
export const autorizarAdminOEmpleado = (req, res, next) => {
  return autorizarRol(["administrador", "empleado"])(req, res, next)
}