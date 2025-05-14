import { VentaService } from "../services/venta-service.js";

const ventaService = new VentaService();

/**
 * Obtiene un resumen general del dashboard con estadísticas de ventas
 */
export async function obtenerResumenDashboard(req, res) {
  try {
    // Obtener todas las ventas
    const ventas = await ventaService.obtenerTodos();

    // Calcular estadísticas
    const totalVentas = ventas.length;
    const montoTotal = ventas.reduce(
      (sum, venta) => sum + (Number(venta.total_pagar) || 0),
      0
    );
    const promedioVenta = totalVentas > 0 ? montoTotal / totalVentas : 0;

    // Obtener ventas de hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const ventasHoy = ventas.filter((venta) => {
      const fechaVenta = new Date(venta.createdAt);
      return fechaVenta >= hoy;
    });

    const montoVentasHoy = ventasHoy.reduce(
      (sum, venta) => sum + (Number(venta.total_pagar) || 0),
      0
    );

    // Contar métodos de pago
    const ventasEfectivo = ventas.filter(
      (venta) => venta.metodo_pago === "efectivo"
    ).length;
    const ventasTransferencia = ventas.filter(
      (venta) => venta.metodo_pago === "transferencia"
    ).length;

    // Responder con las estadísticas
    res.status(200).json({
      exito: true,
      data: {
        totalVentas,
        montoTotal: montoTotal,
        promedioVenta,
        ventasHoy: ventasHoy.length,
        montoVentasHoy,
        metodoPago: {
          efectivo: ventasEfectivo,
          transferencia: ventasTransferencia,
        },
      },
    });
  } catch (error) {
    console.error("Error al obtener resumen del dashboard:", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener resumen del dashboard",
      error: error.message,
    });
  }
}

/**
 * Obtiene las ventas más recientes para mostrar en el dashboard
 */
export async function obtenerVentasRecientes(req, res) {
  try {
    // Obtener todas las ventas
    const ventas = await ventaService.obtenerTodos();

    // Ordenar por fecha de creación (más recientes primero)
    const ventasOrdenadas = [...ventas].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Limitar a las 10 más recientes
    const ventasRecientes = ventasOrdenadas.slice(0, 10);

    res.status(200).json({
      exito: true,
      data: ventasRecientes,
    });
  } catch (error) {
    console.error("Error al obtener ventas recientes:", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener ventas recientes",
      error: error.message,
    });
  }
}

/**
 * Obtiene estadísticas de ventas por período (diario, semanal, mensual)
 */
export async function obtenerEstadisticasPorPeriodo(req, res) {
  try {
    const { periodo } = req.params; // 'diario', 'semanal', 'mensual'
    const ventas = await ventaService.obtenerTodos();

    const estadisticas = [];
    const ahora = new Date();

    if (periodo === "diario") {
      // Estadísticas de los últimos 7 días
      for (let i = 6; i >= 0; i--) {
        const fecha = new Date(ahora);
        fecha.setDate(fecha.getDate() - i);
        fecha.setHours(0, 0, 0, 0);

        const fechaSiguiente = new Date(fecha);
        fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);

        const ventasDelDia = ventas.filter((venta) => {
          const fechaVenta = new Date(venta.createdAt);
          return fechaVenta >= fecha && fechaVenta < fechaSiguiente;
        });

        const montoDelDia = ventasDelDia.reduce(
          (sum, venta) => sum + (Number(venta.total_pagar) || 0),
          0
        );

        estadisticas.push({
          fecha: fecha.toISOString().split("T")[0],
          cantidad: ventasDelDia.length,
          monto: montoDelDia,
        });
      }
    } else if (periodo === "semanal") {
      // Estadísticas de las últimas 4 semanas
      for (let i = 3; i >= 0; i--) {
        const inicioSemana = new Date(ahora);
        inicioSemana.setDate(
          inicioSemana.getDate() - (inicioSemana.getDay() + 7 * i)
        );
        inicioSemana.setHours(0, 0, 0, 0);

        const finSemana = new Date(inicioSemana);
        finSemana.setDate(finSemana.getDate() + 7);

        const ventasDeLaSemana = ventas.filter((venta) => {
          const fechaVenta = new Date(venta.createdAt);
          return fechaVenta >= inicioSemana && fechaVenta < finSemana;
        });

        const montoDeLaSemana = ventasDeLaSemana.reduce(
          (sum, venta) => sum + (Number(venta.total_pagar) || 0),
          0
        );

        estadisticas.push({
          semana: `Semana ${4 - i}`,
          inicio: inicioSemana.toISOString().split("T")[0],
          fin: new Date(finSemana.getTime() - 1).toISOString().split("T")[0],
          cantidad: ventasDeLaSemana.length,
          monto: montoDeLaSemana,
        });
      }
    } else if (periodo === "mensual") {
      // Estadísticas de los últimos 6 meses
      for (let i = 5; i >= 0; i--) {
        const inicioMes = new Date(
          ahora.getFullYear(),
          ahora.getMonth() - i,
          1
        );
        const finMes = new Date(
          ahora.getFullYear(),
          ahora.getMonth() - i + 1,
          0
        );

        const ventasDelMes = ventas.filter((venta) => {
          const fechaVenta = new Date(venta.createdAt);
          return fechaVenta >= inicioMes && fechaVenta <= finMes;
        });

        const montoDelMes = ventasDelMes.reduce(
          (sum, venta) => sum + (Number(venta.total_pagar) || 0),
          0
        );

        estadisticas.push({
          mes: inicioMes.toLocaleString("default", { month: "long" }),
          año: inicioMes.getFullYear(),
          cantidad: ventasDelMes.length,
          monto: montoDelMes,
        });
      }
    } else {
      return res.status(400).json({
        exito: false,
        mensaje: "Período no válido. Use 'diario', 'semanal' o 'mensual'",
      });
    }

    res.status(200).json({
      exito: true,
      data: estadisticas,
    });
  } catch (error) {
    console.error(
      `Error al obtener estadísticas ${req.params.periodo}:`,
      error
    );
    res.status(500).json({
      exito: false,
      mensaje: `Error al obtener estadísticas ${req.params.periodo}`,
      error: error.message,
    });
  }
}
