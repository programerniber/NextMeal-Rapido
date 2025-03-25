import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Usuario from "../models/usuario-model.js";
import UsuarioService from "../services/usuario-service.js";
import { RolRepository } from "../repositories/rol-repository.js";
const ROL = new RolRepository();

dotenv.config();

const usuarioService = new UsuarioService();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("ERROR: JWT_SECRET no está definido en las variables de entorno.");
}

// 🔹 Función para generar Token JWT
const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, nombre: usuario.nombre, id_rol: usuario.id_rol },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const registrar = async (req, res) => {
  const { nombre, email, password, id_rol } = req.body;


  try {
    const usuarioExistente = await usuarioService.obtenerUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await usuarioService.crearUsuario({
      nombre,
      email,
      password: hashedPassword,
      id_rol: id_rol,
    });

    if (!usuario || !usuario.id) {
      return res.status(500).json({ mensaje: "Error al crear el usuario" });
    }

    // 🔹 Esperar que el usuario con su rol esté disponible
    const usuarioConRol = await usuarioService.obtenerUsuarioPorId(usuario.id);
    
    if (!usuarioConRol) {
      return res.status(500).json({ mensaje: "Error al recuperar el usuario recién creado" });
    }

    const token = generarToken(usuarioConRol);

    const rol = await ROL.obtenerRolPorId(id_rol);

    res.status(201).json({
      mensaje: `Usuario registrado exitosamente como ${rol.nombre || "desconocido"}`,
      token,
      usuario: {
        id: usuarioConRol.id,
        nombre: usuarioConRol.nombre,
        email: usuarioConRol.email,
        id_rol: rol.nombre,
      },
    });

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error interno al registrar el usuario", error: error.message });
  }
};

// ✅ **Iniciar Sesión**
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await usuarioService.obtenerUsuarioPorEmail(email);
     
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const esPasswordValido = await bcrypt.compare(password, usuario.password);
    if (!esPasswordValido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Extraer id_rol correctamente
    const { id_rol } = usuario;

    const rol = await ROL.obtenerRolPorId(id_rol);

    // Generar token con permisos
    const token = await generarToken(usuario);

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        id_rol: usuario.id_rol,
        rol: rol.nombre,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ mensaje: "Error interno al iniciar sesión", error: error.message });
  }
};


// ✅ **Obtener todos los usuarios**
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodosLosUsuarios();
    
    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ mensaje: "No hay usuarios registrados" });
    }

    res.json({
      mensaje: "Lista de usuarios registrados",
      usuarios: usuarios.map((usuario) => ({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        id_rol: usuario.id_rol,
      }))
    });

  } catch (error) {
    console.error("Error al obtener usuarios registrados:", error);
    res.status(500).json({ mensaje: "Error interno al obtener usuarios", error: error.message });
  }
};

// ✅ **Obtener un usuario por ID**
export const obtenerUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      id_rol: usuario.Rol.nombre,
    });

  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ mensaje: "Error interno al obtener usuario" });
  }
};

// ✅ **Actualizar usuario**
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, id_rol } = req.body;

  try {
    const usuarioActualizado = await usuarioService.actualizarUsuario(id, { nombre, email, id_rol });

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario actualizado exitosamente", usuario: usuarioActualizado });

  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ mensaje: "Error interno al actualizar usuario" });
  }
};

// ✅ **Eliminar usuario**
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioEliminado = await usuarioService.eliminarUsuario(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario eliminado exitosamente" });

  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ mensaje: "Error interno al eliminar usuario" });
  }
};

// ✅ **Cambiar rol de un usuario**
export const cambiarRolUsuario = async (req, res) => {
  const { id } = req.params;
  const { nuevoRol } = req.body;

  try {
    const usuarioActualizado = await usuarioService.cambiarRol(id, nuevoRol);

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Rol de usuario actualizado correctamente", usuario: usuarioActualizado });

  } catch (error) {
    console.error("Error al cambiar rol de usuario:", error);
    res.status(500).json({ mensaje: "Error interno al cambiar rol de usuario" });
  }
};
