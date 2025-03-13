import express from 'express';
import { registrar, login } from '../controllers/autenticador-controller.js';

const routerautenticacion = express.Router();

// Ruta para registrar usuario
routerautenticacion.post('/registrar', registrar);

// Ruta para iniciar sesión
routerautenticacion.post('/login', login);

export default routerautenticacion;
