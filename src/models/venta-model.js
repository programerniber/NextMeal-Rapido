import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Cliente from "./cliente-model.js";
import Pedido from "./pedido-model.js";

const Venta = sequelize.define(
  "Venta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: null,
      references: {
        model: Cliente,
        key: "id",
      },
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
Venta.belongsTo(Cliente, { foreignKey: "id_cliente" });
Venta.belongsTo(Pedido, { foreignKey: "id_pedido" });

Cliente.hasMany(Venta, { foreignKey: "id_cliente" });
Pedido.hasMany(Venta, { foreignKey: "id_pedido" });

export default Venta;
