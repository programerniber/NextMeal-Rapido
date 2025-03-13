import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import Usuario from "../models/usuario-model.js"
import Rol from "../models/rol-model.js"

// Cargar variables de entorno
dotenv.config()

// Obtener JWT_SECRET de las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET

// Verificar que JWT_SECRET esté definido
if (!JWT_SECRET) {
  console.error("ERROR: JWT_SECRET no está definido en las variables de entorno.")
  process.exit(1) // Detener la aplicación si falta esta variable crítica
}

const generarToken = (usuario) => {
  return jwt.sign({ id: usuario.id, nombre: usuario.nombre, rol: usuario.Rol.nombre }, JWT_SECRET, { expiresIn: "1h" })
}

export const registrar = async (req, res) => {
  const { nombre, email, password } = req.body
  // Asignamos automáticamente el rol de administrador (id_rol = 1)
  const id_rol = 1

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } })
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" })
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear usuario en la BD con rol de administrador
    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      id_rol, 
    })

    // Obtener el usuario con su rol asociado
    const usuarioConRol = await Usuario.findOne({
      where: { id: usuario.id },
      include: [{ model: Rol, attributes: ["nombre"] }],
    })

    const token = generarToken(usuarioConRol)

    // Devolver el token en la respuesta
    res.status(201).json({
      mensaje: "Usuario registrado exitosamente como Administrador",
      token,
      usuario: {
        id: usuarioConRol.id,
        nombre: usuarioConRol.nombre,
        email: usuarioConRol.email,
        rol: usuarioConRol.Rol.nombre,
      },
    })
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    res.status(500).json({ mensaje: "Error interno al registrar el usuario", error: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Buscar el usuario en la BD con su rol
    const usuario = await Usuario.findOne({
      where: { email },
      include: [{ model: Rol, attributes: ["nombre"] }],
    })

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" })
    }

    // Verificar contraseña
    const esPasswordValido = await bcrypt.compare(password, usuario.password)
    if (!esPasswordValido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" })
    }

    // Generar token JWT
    const token = generarToken(usuario)

    // Devolver el token en la respuesta (sin usar cookies)
    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.Rol.nombre,
      },
    })
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    res.status(500).json({ mensaje: "Error interno al iniciar sesión", error: error.message })
  }
}

