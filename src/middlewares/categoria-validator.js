import { body, param } from "express-validator";

export const validarCreacionCategoriaExistente = [
  body("nombreCategoria")
    .notEmpty()
    .withMessage("El nombre de categoria es obligatorio")
    .isString().withMessage("El nombre debe ser un texto")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 a 50 caracteres"),

  body("descripcionCategoria")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 5, max: 100 })
    .withMessage("La descripción debe tener entre 5 a 100 caracteres"),
];

export const validacionActualizacionCategorias = [
  body("nombreCategoria")
    .optional()
    .isString().withMessage("El nombre debe ser un texto")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 a 50 caracteres"),

  body("descripcionCategoria")
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage("La descripción debe tener entre 5 a 100 caracteres"),
];

export const validarIdCategoria = [
  param("id")
    .isInt()
    .withMessage("El ID de la categoría debe ser un número entero"),
];

