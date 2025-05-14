import { Router } from "express"
import {
  obtenerResumenDashboard,
  obtenerVentasRecientes,
  obtenerEstadisticasPorPeriodo,
  
} from "../controllers/dashboard-controller.js"
import { autenticar, verificarPermiso } from "../middlewares/autenticador-validator.js"

const routerDashboard = Router()

// Aplicar autenticación a todas las rutas del dashboard
// routerDashboard.use(autenticar)

// Verificar permiso para acceder al dashboard
// routerDashboard.use(verificarPermiso("dashboard", "ver"))

// Rutas del dashboard
routerDashboard.get("/resumen", obtenerResumenDashboard)
routerDashboard.get("/ventas-recientes", obtenerVentasRecientes)
routerDashboard.get("/estadisticas/:periodo", obtenerEstadisticasPorPeriodo)

// routerDashboard.get("/clientes-destacados", obtenerClientesDestacados)

export default routerDashboard

