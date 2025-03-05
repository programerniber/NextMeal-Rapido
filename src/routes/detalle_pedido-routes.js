import express from 'express';
import { 
  obtenerTodosLosDetallesPedido, 
  obtenerDetallePedidoPorId, 
  crearDetallePedido, 
  actualizarDetallePedido, 
  eliminarDetallePedido 
} from '../controllers/detalle_pedido-controller.js';

import { 
  validarCreacionDetallePedido, 
  validarActualizacionDetallePedido, 
  validarIdDetallePedido 
} from '../middlewares/detalle_pedido-validator.js';

const routerDetallePedido = express.Router();

routerDetallePedido.get('/', obtenerTodosLosDetallesPedido);
routerDetallePedido.get('/:id', validarIdDetallePedido, obtenerDetallePedidoPorId);
routerDetallePedido.post('/', validarCreacionDetallePedido, crearDetallePedido);
routerDetallePedido.put('/:id', validarIdDetallePedido, validarActualizacionDetallePedido, actualizarDetallePedido);
routerDetallePedido.delete('/:id', validarIdDetallePedido, eliminarDetallePedido);

export default routerDetallePedido;
