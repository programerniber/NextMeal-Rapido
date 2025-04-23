import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import UsuarioService from "../services/usuario-service.js"
import { RolRepository } from "../repositories/rol-repository.js"
import { generarToken } from "../utils/jwt.js"
const ROL = new RolRepository()

dotenv.config()

const usuarioService = new UsuarioService()

//  **Iniciar Sesión**
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Buscar al usuario por su email
    const usuario = await usuarioService.obtenerUsuarioPorEmail(email)

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" })
    }

    // Comparar la contraseña enviada con la encriptada
    const esPasswordValido = await bcrypt.compare(password, usuario.password)

    if (!esPasswordValido) {
      return res.status(401).json({ mensaje: "Contraseña y/o Correo incorrecta" })
    }

    // Generar el token JWT
    const token = generarToken(usuario)

    // Configuración de cookies mejorada para desarrollo y producción
    const cookieOptions = {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hora
      path: "/",
    }

    // Solo usar secure y sameSite en producción
    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true
      cookieOptions.sameSite = "None"
    }

    // Establecer la cookie
    res.cookie("token", token, cookieOptions)

    // Responder con el token y datos del usuario
    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        id_rol: usuario.id_rol,
      },
    })
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    res.status(500).json({ mensaje: "Error interno al iniciar sesión", error: error.message })
  }
}

// Ruta para devolver el usuario autenticado
export const obtenerUsuarioAutenticado = (req, res) => {
  if (!req.usuario) {
    return res.status(401).json({ exito: false, mensaje: "No autenticado" })
  }

  res.status(200).json({
    exito: true,
    data: {
      id: req.usuario.id,
      nombre: req.usuario.nombre,
      email: req.usuario.email,
      id_rol: req.usuario.id_rol,
      permisos: req.usuario.permisos || [],
    },
  })
}

// Cerrar sesión
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  })

  res.status(200).json({ exito: true, mensaje: "Sesión cerrada correctamente" })
}

// ✅ **Obtener todos los usuarios**
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodosLosUsuarios()

    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ mensaje: "No hay usuarios registrados" })
    }

    res.json({
      mensaje: "Lista de usuarios registrados",
      usuarios: usuarios.map((usuario) => ({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        id_rol: usuario.id_rol,
      })),
    })
  } catch (error) {
    console.error("Error al obtener usuarios registrados:", error)
    res.status(500).json({ mensaje: "Error interno al obtener usuarios", error: error.message })
  }
}

// ✅ **Obtener un usuario por ID**
export const obtenerUsuario = async (req, res) => {
  const { id } = req.params

  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(id)
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" })
    }

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      id_rol: usuario.Rol?.nombre || usuario.id_rol,
    })
  } catch (error) {
    console.error("Error al obtener usuario:", error)
    res.status(500).json({ mensaje: "Error interno al obtener usuario" })
  }
}

// ✅ **Actualizar usuario**
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params
  const { nombre, email, id_rol } = req.body

  try {
    const usuarioActualizado = await usuarioService.actualizarUsuario(id, { nombre, email, id_rol })

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" })
    }

    res.json({ mensaje: "Usuario actualizado exitosamente", usuario: usuarioActualizado })
  } catch (error) {
    console.error("Error al actualizar usuario:", error)
    res.status(500).json({ mensaje: "Error interno al actualizar usuario" })
  }
}

// ✅ **Eliminar usuario**
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params

  try {
    const usuarioEliminado = await usuarioService.eliminarUsuario(id)

    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" })
    }

    res.json({ mensaje: "Usuario eliminado exitosamente" })
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    res.status(500).json({ mensaje: "Error interno al eliminar usuario" })
  }
}

export const crearUsuarioController = async (req, res) => {
  try {
    const { nombre, email, password, id_rol } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const nuevoUsuario = {
      nombre,
      email,
      password: hashedPassword,
      id_rol,
    }
    const usuarioCreado = await usuarioService.crearUsuario(nuevoUsuario)
    res.status(200).json(usuarioCreado)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error interno al crear un usuario" })
  }
}
