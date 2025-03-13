import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// Cargar variables de entorno
dotenv.config()

// Obtener JWT_SECRET de las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET

// Verificar que JWT_SECRET esté definido
if (!JWT_SECRET) {
  console.error("ERROR: JWT_SECRET no está definido en las variables de entorno.")
  process.exit(1) // Detener la aplicación si falta esta variable crítica
}

export const autenticar = (req, res, next) => {
  // Obtener el token del header Authorization
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] // Extraer el token después de "Bearer "

  if (!token) {
    return res.status(401).json({
      exito: false,
      mensaje: "Acceso denegado, token no proporcionado",
      
    })
  }

  try {
    // Verificar el token usando JWT_SECRET de las variables de entorno
    const decoded = jwt.verify(token, JWT_SECRET)

    // Asignar la información del usuario decodificada a req.usuario
    req.usuario = decoded

    next()
  } catch (error) {
    console.error("Error al verificar token:", error.message)
    return res.status(401).json({
      exito: false,
      mensaje: "Token inválido o expirado",
      error: error.message,
    })
  }
}

// Middleware para autorizar roles específicos
export const autorizarAdmin = (req, res, next) => {
  // Verificar que req.usuario exista (el middleware autenticar debe ejecutarse primero)
  if (!req.usuario) {
    return res.status(403).json({
      exito: false,
      mensaje: "Acceso denegado. Usuario no autenticado",
     
    })
  }

  // Verificar que el usuario tenga el rol de Administrador
  if (req.usuario.rol !== "administrador") {
    return res.status(403).json({
      exito: false,
      mensaje: "Acceso denegado. Se requiere rol de Administrador",
      rolActual: req.usuario.rol,
    })
  }

  next()
}

