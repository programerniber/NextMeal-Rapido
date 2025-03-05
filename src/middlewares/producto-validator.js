import { body, param, validationResult } from "express-validator";

export const validarCreacionProducto = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  body("descripcion")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 500 })
    .withMessage("La descripción no puede superar los 500 caracteres"),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0.01 })
    .withMessage("El precio debe ser un número mayor a 0"),

  body("stock")
    .notEmpty()
    .withMessage("El stock es obligatorio")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero mayor o igual a 0"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];

export const validarActualizacionProducto = [
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  body("descripcion")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto")
    .isLength({ max: 500 })
    .withMessage("La descripción no puede superar los 500 caracteres"),

  body("precio")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("El precio debe ser un número mayor a 0"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero mayor o igual a 0"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];

export const validarIdProducto = [
  param("id").isInt().withMessage("El ID debe ser un número entero"),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];
