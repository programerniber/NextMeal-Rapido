import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Cliente from "./cliente-model.js";

const Pedido = sequelize.define(
  "Pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull:false, 
      references: { 
        model: Cliente,
        key: "id",       
      },
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    }, 
    estado: {
      type: DataTypes.ENUM("pendiente", "preparacion", "entregado", "cancelado"),
      allowNull: false,
      defaultValue: "pendiente",
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    metodo_pago: {
      type: DataTypes.ENUM("Efectivo", "Transferencia"),
      allowNull: false,
    },
    direccion_envio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, 
  }
);


Pedido.belongsTo(Cliente, { foreignKey: "id_cliente" });
Cliente.hasMany(Pedido, { foreignKey: "id_cliente" });

export default Pedido;
