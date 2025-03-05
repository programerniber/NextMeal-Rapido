import { body, param, validationResult } from "express-validator"

export const validarCreacionPedido = [
  body("id_cliente")
    .notEmpty() 
    .withMessage("ID tiene que ser numero entero")
    .isInt()
    .withMessage("El ID del cliente debe ser un número entero"),


 
  body("total")
    .notEmpty()
    .withMessage("El total del pedido es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El total debe ser un número positivo"),

  body("estado")
    .notEmpty()
    .withMessage("El estado del pedido es obligatorio")
    .isIn(["Pendiente", "En proceso", "Entregado", "Cancelado"])
    .withMessage("El estado debe ser 'Pendiente', 'En proceso', 'Entregado' o 'Cancelado'"),

  (req, res, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }
    next()
  },
]

export const validarActualizacionPedido = [
  
  body("total")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El total debe ser un número positivo"),

  body("estado")
    .optional()
    .isIn(["Pendiente", "En proceso", "Entregado", "Cancelado"])
    .withMessage("El estado debe ser 'Pendiente', 'En proceso', 'Entregado' o 'Cancelado'"),

  (req, res, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }
    next()
  },
]

export const validarIdPedido = [
  param("id")
    .isInt()
    .withMessage("El ID del pedido debe ser un número entero"),

  (req, res, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }
    next()
  },
]

export const validarCambioEstadoPedido = [
  param("id")
    .isInt()
    .withMessage("El ID del pedido debe ser un número entero"),

  body("estado")
    .notEmpty()
    .withMessage("El estado del pedido es obligatorio")
    .isIn(["Pendiente", "En proceso", "Entregado", "Cancelado"])
    .withMessage("El estado debe ser 'Pendiente', 'En proceso', 'Entregado' o 'Cancelado'"),

  (req, res, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }
    next()
  },
]
