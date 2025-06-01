import { DashboardService } from "../services/dashboard-services.js";

const dashboardService = new DashboardService();

export const obtenerResumen = async (req, res) => {
  try {
    const ventas = await ventaService.obtenerTodos();
    const hoyUTC = getUTCDateRange(0);

    // Cálculos generales
    const totalVentas = ventas.length;
    const montoTotal = ventas.reduce(
      (sum, v) => sum + (Number(v.total_pagar) || 0),
      0
    );

    // Métodos de pago dinámicos
    const metodoPago = ventas.reduce((acc, venta) => {
      const metodo = venta.metodo_pago || "otro";
      acc[metodo] = (acc[metodo] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      exito: true,
      data: {
        totalVentas,
        montoTotal,
        promedioVenta: totalVentas > 0 ? montoTotal / totalVentas : 0,
        metodoPago,
      },
    });
  } catch (error) {
    console.error("Error en resumen:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno" });
  }
};

export const obtenerEstadisticasSemanal = async (req, res) => {
  try {
    const ventas = await ventaService.obtenerRecientes(10); // Implementar este método en el servicio
    res.status(200).json({ exito: true, data: ventas });
  } catch (error) {
    console.error("Error en ventas recientes:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno" });
  }
};

export const obtenerMetodosPagoHoy = async (req, res) => {
  try {
    const { periodo } = req.params;
    const ventas = await ventaService.obtenerTodos();
    const estadisticas = [];

    if (periodo === "diario") {
      const hastaStr = req.query.hasta;
      if (!hastaStr) {
        return res.status(400).json({ exito: false, mensaje: "Falta el parámetro 'hasta'" });
      }

      const hasta = new Date(hastaStr);
      if (isNaN(hasta.getTime())) {
        return res.status(400).json({ exito: false, mensaje: "Parámetro 'hasta' inválido" });
      }
      hasta.setHours(23, 59, 59, 999);

      for (let i = 6; i >= 0; i--) {
        const fechaActual = new Date(hasta);
        fechaActual.setDate(hasta.getDate() - i);

        const fechaInicio = new Date(fechaActual);
        fechaInicio.setHours(0, 0, 0, 0);

        const fechaFin = new Date(fechaActual);
        fechaFin.setHours(23, 59, 59, 999);

        const ventasDia = ventas.filter((v) => {
          const fechaVenta = new Date(v.createdAt);
          return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
        });

        estadisticas.push({
          fecha: fechaInicio.toISOString().split('T')[0], // Solo la fecha en formato YYYY-MM-DD
          monto: ventasDia.reduce((sum, v) => sum + (Number(v.total_pagar) || 0), 0),
          cantidad: ventasDia.length,
        });
      }
    } else {
      return res.status(400).json({ exito: false, mensaje: "Período no soportado" });
    }

    res.status(200).json({
      exito: true,
      data: estadisticas,
    });
  } catch (error) {
    console.error("Error en estadísticas:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno" });
  }
}
