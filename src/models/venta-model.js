import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Pedido from "./pedido-model.js";
import Cliente from "./cliente-model.js";
import Producto from "./poductos-model.js";

const Venta = sequelize.define(
  "Venta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pedido,
        key: "id",
      },
    },
    fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    total_pagar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    metodo_pago: {
      type: DataTypes.ENUM("efectivo", "transferencia"),
      allowNull: false,
    },
   
  },
  {
    timestamps: true,
  }
);

// Relaciones
Venta.belongsTo(Pedido, { foreignKey: "id_pedido" });
Pedido.hasMany(Venta, { foreignKey: "id_pedido" });

// Relaciones directas con Cliente y Producto
// Estas relaciones se establecerán a través de hooks
Venta.belongsTo(Cliente, { foreignKey: "id_cliente" });
Cliente.hasMany(Venta, { foreignKey: "id_cliente" });

Venta.belongsTo(Producto, { foreignKey: "id_producto" });
Producto.hasMany(Venta, { foreignKey: "id_producto" });

// Hook para establecer automáticamente id_cliente e id_producto desde el pedido
Venta.beforeCreate(async (venta) => {
  if (venta.id_pedido) {
    const pedido = await Pedido.findByPk(venta.id_pedido, {
      include: [
        { model: Cliente },
        { model: Producto }
      ]
    });
    
    if (pedido) {
      venta.id_cliente = pedido.id_cliente;
      venta.id_producto = pedido.id_producto;

      await pedido.update({ estado: "entregado" });
    }
  }
});

export default Venta;