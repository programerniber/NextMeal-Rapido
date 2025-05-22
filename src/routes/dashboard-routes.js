import { Router } from "express";
import {
  obtenerResumenDashboard,
  obtenerVentasRecientes,
  obtenerEstadisticasPorPeriodo
} from "../controllers/dashboard-controller.js";

const routerDashboard = Router();

// Rutas optimizadas
routerDashboard.get("/resumen", obtenerResumenDashboard);
routerDashboard.get("/ventas-recientes", obtenerVentasRecientes);
routerDashboard.get("/estadisticas/:periodo", obtenerEstadisticasPorPeriodo);

export default routerDashboard;