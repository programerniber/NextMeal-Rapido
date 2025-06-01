import { Router } from "express";
import {
  obtenerResumenDashboard,
  obtenerVentasRecientes,
  obtenerEstadisticasPorPeriodo,
  obtenerMetodosPagoHoy
} from "../controllers/dashboard-controller.js";

const routerDashboard = Router();

// Rutas optimizadas
routerDashboard.get("/resumen", obtenerResumenDashboard);
routerDashboard.get("/ventas-recientes", obtenerVentasRecientes);
routerDashboard.get("/estadisticas/:periodo", obtenerEstadisticasPorPeriodo);
routerDashboard.get("/metodos-pago/hoy", obtenerMetodosPagoHoy);

export default routerDashboard;