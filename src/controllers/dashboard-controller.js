import { VentaService } from "../services/venta-service.js";

const ventaService = new VentaService();

// Función auxiliar para fechas UTC
const getUTCDateRange = (daysOffset) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysOffset);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

export async function obtenerResumenDashboard(req, res) {
  try {
    const ventas = await ventaService.obtenerTodos();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const mañana = new Date(hoy);
    mañana.setDate(hoy.getDate() + 1);

    // Calcular ventas de hoy
    const ventasHoy = ventas.filter(v => {
      const fechaVenta = new Date(v.createdAt);
      return fechaVenta >= hoy && fechaVenta < mañana;
    });

    // Calcular ventas de esta semana
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    
    const ventasSemana = ventas.filter(v => {
      const fechaVenta = new Date(v.createdAt);
      return fechaVenta >= inicioSemana;
    });

    // Calcular ventas de este mes
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    
    const ventasMes = ventas.filter(v => {
      const fechaVenta = new Date(v.createdAt);
      return fechaVenta >= inicioMes;
    });

    // Cálculos generales
    const totalVentas = ventas.length;
    const montoTotal = ventas.reduce(
      (sum, v) => sum + (Number(v.total_pagar) || 0),
      0
    );

    // Montos específicos
    const montoVentasHoy = ventasHoy.reduce(
      (sum, v) => sum + (Number(v.total_pagar) || 0),
      0
    );

    const montoVentasSemana = ventasSemana.reduce(
      (sum, v) => sum + (Number(v.total_pagar) || 0),
      0
    );

    const montoVentasMes = ventasMes.reduce(
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
        montoVentasHoy,
        montoVentasSemana,
        montoVentasMes,
        cantidadVentasHoy: ventasHoy.length,
        promedioVenta: totalVentas > 0 ? montoTotal / totalVentas : 0,
        metodoPago,
      },
    });
  } catch (error) {
    console.error("Error en resumen:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function obtenerVentasRecientes(req, res) {
  try {
    const ventas = await ventaService.obtenerTodos();
    // Ordenar por fecha más reciente y tomar las primeras 10
    const ventasRecientes = ventas
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
      
    res.status(200).json({ exito: true, data: ventasRecientes });
  } catch (error) {
    console.error("Error en ventas recientes:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

export async function obtenerEstadisticasPorPeriodo(req, res) {
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
          fecha: fechaInicio.toISOString().split('T')[0],
          monto: ventasDia.reduce((sum, v) => sum + (Number(v.total_pagar) || 0), 0),
          cantidad: ventasDia.length,
        });
      }
    } else if (periodo === "semanal") {
      // Implementar estadísticas semanales
      const hoy = new Date();
      const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      
      for (let i = 6; i >= 0; i--) {
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() - i);
        fecha.setHours(0, 0, 0, 0);
        
        const fechaFin = new Date(fecha);
        fechaFin.setHours(23, 59, 59, 999);
        
        const ventasDia = ventas.filter(v => {
          const fechaVenta = new Date(v.createdAt);
          return fechaVenta >= fecha && fechaVenta <= fechaFin;
        });
        
        estadisticas.push({
          dia: diasSemana[fecha.getDay()],
          fecha: fecha.toISOString().split('T')[0],
          monto: ventasDia.reduce((sum, v) => sum + (Number(v.total_pagar) || 0), 0),
          cantidad: ventasDia.length,
        });
      }
    } else {
      return res.status(400).json({ exito: false, mensaje: "Período no soportado. Use 'diario' o 'semanal'" });
    }

    res.status(200).json({
      exito: true,
      data: estadisticas,
    });
  } catch (error) {
    console.error("Error en estadísticas:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}

// Nueva función para métodos de pago de hoy
export async function obtenerMetodosPagoHoy(req, res) {
  try {
    const ventas = await ventaService.obtenerTodos();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const mañana = new Date(hoy);
    mañana.setDate(hoy.getDate() + 1);

    // Filtrar ventas de hoy
    const ventasHoy = ventas.filter(v => {
      const fechaVenta = new Date(v.createdAt);
      return fechaVenta >= hoy && fechaVenta < mañana;
    });

    // Agrupar por método de pago
    const metodosPago = ventasHoy.reduce((acc, venta) => {
      const metodo = venta.metodo_pago?.toLowerCase() || "otro";
      if (!acc[metodo]) {
        acc[metodo] = { monto: 0, cantidad: 0 };
      }
      acc[metodo].monto += Number(venta.total_pagar) || 0;
      acc[metodo].cantidad += 1;
      return acc;
    }, {});

    res.status(200).json({
      exito: true,
      data: metodosPago,
    });
  } catch (error) {
    console.error("Error en métodos de pago hoy:", error);
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" });
  }
}