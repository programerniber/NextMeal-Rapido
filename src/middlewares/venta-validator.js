import { body, param, validationResult } from "express-validator";

const validarErrores = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

export const validarCreacionVenta = [
  body("id_cliente")
    .notEmpty().withMessage("El ID del cliente es obligatorio")
    .isInt().withMessage("El ID del cliente debe ser un número entero"),

  body("metodo_pago")
    .notEmpty().withMessage("El método de pago es obligatorio")
    .isIn(["efectivo", "transferencia"]).withMessage("Método de pago no válido. Debe ser 'efectivo' o 'transferencia'"),

  validarErrores,
];

export const validarActualizacionVenta = [
  body("total")
    .optional()
    .isFloat({ min: 0.01 }).withMessage("El total debe ser un número mayor a 0"),

  body("metodo_pago")
    .optional()
    .isIn(["efectivo", "transferencia"]).withMessage("Método de pago no válido. Debe ser 'efectivo' o 'transferencia'"),

  validarErrores,
];

export const validarIdVenta = [
  param("id")
    .isInt().withMessage("El ID de la venta debe ser un número entero"),

  validarErrores,
];

export const validarCambioMetodoPago = [
  param("id")
    .isInt().withMessage("El ID de la venta debe ser un número entero"),

  body("metodo_pago")
    .notEmpty().withMessage("El método de pago es obligatorio")
    .isIn(["efectivo", "transferencia"]).withMessage("Método de pago no válido. Debe ser 'efectivo' o 'transferencia'"),

  validarErrores,
];
