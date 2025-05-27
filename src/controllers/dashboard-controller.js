import  {DashboardService} from "../services/dashboard-services.js";

const dashboardService = new DashboardService();

export async function obtenerResumen(req, res) {
  try {
    const resumen = await dashboardService.obtenerResumen();
    res.status(200).json({
      exito: true,
      data: resumen,
    });
  } catch (error) {
    console.error("Error al obtener resumen:", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener resumen del dashboard",
      error: error.message,
    });
  }
}

export async function obtenerEstadisticasSemanal(req, res) {
  try {
    const estadisticas = await dashboardService.obtenerEstadisticasSemanal();
    res.status(200).json({
      exito: true,
      data: estadisticas,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas semanales:", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener estadísticas semanales",
      error: error.message,
    });
  }
}

export async function obtenerMetodosPagoHoy(req, res) {
  try {
    const metodosPago = await dashboardService.obtenerMetodosPagoHoy();
    res.status(200).json({
      exito: true,
      data: metodosPago,
    });
  } catch (error) {
    console.error("Error al obtener métodos de pago de hoy:", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener métodos de pago de hoy",
      error: error.message,
    });
  }
}

export async function obtenerVentasEnTiempoReal(req, res) {
  try {
    const ventasHoy = await dashboardService.obtenerVentasHoy();
    res.status(200).json({
      exito: true,
      data: ventasHoy,
    });
  } catch (error) {
    console.error("Error al obtener ventas en tiempo real:", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener ventas en tiempo real",
      error: error.message,
    });
  }
}