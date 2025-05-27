import { Router } from "express";
import {
  obtenerResumen,
  obtenerEstadisticasSemanal,
  obtenerMetodosPagoHoy,
  obtenerVentasEnTiempoReal
} from "../controllers/dashboard-controller.js";

const routerDashboard = Router();

// Rutas públicas del dashboard - SIN autenticación
routerDashboard.get("/resumen", obtenerResumen);
routerDashboard.get("/estadisticas/semanal", obtenerEstadisticasSemanal);
routerDashboard.get("/metodos-pago/hoy", obtenerMetodosPagoHoy);
routerDashboard.get("/ventas/tiempo-real", obtenerVentasEnTiempoReal);

export default routerDashboard;