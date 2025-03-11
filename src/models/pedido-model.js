import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Cliente from "./cliente-model.js";
import Producto from "./producto-model.js";

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
      allowNull: false,
      references: {
        model: Cliente,
        key: "id",
      },
    },

    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: "id",
      },
    },

    precio_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0, 
    },

    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0, 
    },

  
    direccion_envio: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    timestamps: true,
    hooks: {
      async beforeValidate(pedido) { 
        if (!pedido.cantidad) {
          pedido.cantidad = 1; 
        }
      },

      async beforeCreate(pedido) { 
        const producto = await Producto.findByPk(pedido.id_producto);
        if (!producto) {
          throw new Error("Producto no encontrado");
        }
        pedido.precio_unitario = producto.precio;
        pedido.total = pedido.cantidad * pedido.precio_unitario;
      },

      async beforeUpdate(pedido) { 
        const producto = await Producto.findByPk(pedido.id_producto);
        if (!producto) {
          throw new Error("Producto no encontrado");
        }
        pedido.precio_unitario = producto.precio;
        pedido.total = pedido.cantidad * pedido.precio_unitario;
      },
      async beforeDestroy(pedido) { 
        if (pedido.estado === "entregado") {
          throw new Error("No se puede eliminar un pedido que ya fue entregado");
        }
      }
    },
  }
);


Pedido.belongsTo(Cliente, { foreignKey: "id_cliente" });
Pedido.belongsTo(Producto, { foreignKey: "id_producto" });

Cliente.hasMany(Pedido, { foreignKey: "id_cliente" });
Producto.hasMany(Pedido, { foreignKey: "id_producto" });

export default Pedido;
