import { body, param, validationResult } from "express-validator";

export const validarCreacionDetallePedido = [
  body("id_pedido")
    .notEmpty()
    .withMessage("El ID del pedido es obligatorio")
    .isInt()
    .withMessage("El ID del pedido debe ser un número entero"),

  body("id_producto")
    .notEmpty()
    .withMessage("El ID del producto es obligatorio")
    .isInt()
    .withMessage("El ID del producto debe ser un número entero"),

  body("cantidad")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero positivo"),

  body("precio_unitario")
    .notEmpty()
    .withMessage("El precio unitario es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El precio unitario debe ser un número positivo"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];

export const validarActualizacionDetallePedido = [
  body("cantidad")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero positivo"),

  body("precio_unitario")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio unitario debe ser un número positivo"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];

export const validarIdDetallePedido = [
  param("id")
    .isInt()
    .withMessage("El ID del detalle de pedido debe ser un número entero"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];