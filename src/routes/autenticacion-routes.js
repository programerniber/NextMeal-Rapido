import express from 'express';
import { registrar, login } from '../controllers/autenticador-controller.js';

const routerautenticacion = express.Router();

routerautenticacion.post('/registrar', registrar);
routerautenticacion.post('/login', login);

export default routerautenticacion;