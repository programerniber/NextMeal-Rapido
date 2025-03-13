import { RolService } from "../services/rol-service.js";

const rolService = new RolService();

export async function obtenerRoles(req, res) {
  try {
    const roles = await rolService.obtenerTodosLosRoles();
    res.status(200).json({ exito: true, data: roles });
  } catch (error) {
    console.error("Error al obtener roles:", error.message);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function obtenerRolPorId(req, res) {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ exito: false, mensaje: "ID inválido" });

    const rol = await rolService.obtenerRolPorId(id);
    if (!rol) {
      return res.status(404).json({ exito: false, mensaje: "Rol no encontrado" });
    }

    res.status(200).json({ exito: true, data: rol });
  } catch (error) {
    console.error("Error al obtener rol por ID:", error.message);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function crearRol(req, res) {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ exito: false, mensaje: "El nombre del rol es obligatorio" });
    }

    const nuevoRol = await rolService.crearRol({ nombre });
    res.status(201).json({ exito: true, data: nuevoRol, mensaje: "Rol creado exitosamente" });
  } catch (error) {
    console.error("Error al crear rol:", error.message);
    res.status(400).json({ exito: false, mensaje: error.message });
  }
}

export async function actualizarRol(req, res) {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ exito: false, mensaje: "ID inválido" });

    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ exito: false, mensaje: "El nombre del rol es obligatorio" });
    }

    const rolActualizado = await rolService.actualizarRol(id, { nombre });
    if (!rolActualizado) {
      return res.status(404).json({ exito: false, mensaje: "Rol no encontrado" });
    }

    res.status(200).json({ exito: true, data: rolActualizado, mensaje: "Rol actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar rol:", error.message);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function eliminarRol(req, res) {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ exito: false, mensaje: "ID inválido" });

    const resultado = await rolService.eliminarRol(id);
    if (!resultado) {
      return res.status(404).json({ exito: false, mensaje: "Rol no encontrado" });
    }

    res.status(200).json({ exito: true, mensaje: "Rol eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar rol:", error.message);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}
