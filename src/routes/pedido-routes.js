import express from 'express';
import { 
  obtenerTodosLosPedidos, 
  obtenerPedidoPorId, 
  crearPedido, 
  actualizarPedido, 
  eliminarPedido, 
  cambiarEstadoPedido 
} from '../controllers/pedido-controller.js';

import { 
  validarCreacionPedido, 
  validarActualizacionPedido, 
  validarIdPedido, 
  validarCambioEstadoPedido 
} from '../middlewares/pedido-validator.js';

const routerpedido = express.Router();
 
 
routerpedido.get('/', obtenerTodosLosPedidos);
routerpedido.get('/:id', validarIdPedido, obtenerPedidoPorId);
routerpedido.post('/', validarCreacionPedido, crearPedido);
routerpedido.put('/:id', validarIdPedido, validarActualizacionPedido, actualizarPedido);
routerpedido.delete('/:id', validarIdPedido, eliminarPedido);
routerpedido.patch('/:id/estado', validarCambioEstadoPedido, cambiarEstadoPedido);

export default routerpedido; 
 