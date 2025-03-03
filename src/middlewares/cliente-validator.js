import { body, param, validationResult } from "express-validator"

export const validarCreacionCliente = [

  body("nombreCompleto")
    .notEmpty()
    .withMessage("El nombre completo es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  body("tipoDocumento")
    .optional()
    .isIn(["cc","tarjeta identidad","passport"])
    .withMessage("ingrese solo cc - tarjeta identida - "),
 
  body("documentoIdentidad") 
    .notEmpty()
    .withMessage("El documento de identidad es obligatorio")
    .isLength({ min: 6, max:10 })
    .withMessage("El documento debe tener entre 6 y 10 caracteres"),

  body("correoElectronico")
    .notEmpty().withMessage("El correo electrónico es obligatorio")
    .isEmail().withMessage("Debe ser un correo electrónico válido")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/i)
    .withMessage("El correo debe contener '@' y terminar en '.com', '.net', '.org'"),
  

  body("telefono")
    .notEmpty() 
    .withMessage("El teléfono es obligatorio")
    .isLength({min:10,max:10})
    .withMessage("solo se permite 10 caracteres "),

  body("direccion")
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .isLength({ min: 5, max: 200 })
    .withMessage("La dirección debe tener entre 5 y 200 caracteres"),

  body("genero")
    .notEmpty()
    .withMessage("El género es obligatorio")
    .isIn(["Masculino", "Femenino", "Otro"])
    .withMessage("El género debe ser en mayuscula la primera palabra"),

  body("contrasena")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  (req, res, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }
    next()
  },
]
 
export const validarActualizacionCliente = [
  body("nombreCompleto")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

    body("tipoDocumento")
    .optional()
    .isIn(["cc","tarjeta identidad","passport"])
    .withMessage("ingrese solo cc - tarjeta identida - "),

  body("documentoIdentidad")
    .optional()
    .isLength({ min: 6, max: 10 })
    .withMessage("El documento debe tener 6 a 10 caracteres"),

  body("correoElectronico")
    .notEmpty().withMessage("El correo electrónico es obligatorio")
    .isEmail().withMessage("Debe ser un correo electrónico válido")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/i)
    .withMessage("El correo debe contener '@' y terminar en '.com', '.net', '.org',"),

  body("telefono")
    .notEmpty() 
    .withMessage("El teléfono es obligatorio")
    .isLength({min:10,max:10})
    .withMessage("solo se permite 10 caracteres "),

  body("direccion")
    .optional()
    .isLength({ min: 5, max: 200 })
    .withMessage("La dirección debe tener entre 5 y 200 caracteres"),

  body("genero")
    .optional()
    .isIn(["Masculino", "Femenino", "Otro"])
    .withMessage("El género debe ser en mayuscula la primera palabra"),

  body("contrasena").optional().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),

  (req, res, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }
    next()
  },
]

export const validarIdCliente = [
  param("id").isInt().withMessage("El ID debe ser un número entero"),

  (req, res, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }
    next()
  },
]

export const validarCambioEstado = [
  param("id").isInt().withMessage("El ID debe ser un número entero"),

  body("estado")
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .isIn(["Activo", "Inactivo"])
    .withMessage("El estado debe ser 'Activo' o 'Inactivo'"),

  (req, res, next) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() })
    }
    next()
  },
]

