import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Pedido from "./pedido-model.js";
import Producto from "./producto-model.js";

const DetallePedido = sequelize.define("DetallePedido", {
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
        key: "id" },
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 

        model: Producto,
         key: "id" },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,

  hooks: {
    
    beforeCreate: (detalle) => {
      detalle.subtotal = detalle.cantidad * detalle.precio_unitario;
    },
    
    beforeUpdate: (detalle) => {
      detalle.subtotal = detalle.cantidad * detalle.precio_unitario;
    },
    
    beforeDestroy: async (detalle) => {
      const pedido = await Pedido.findByPk(detalle.id_pedido);
      if (pedido.estado === "entregado") {
        throw new Error("No se puede eliminar un producto de un pedido entregado.");
      }
    },
  }
  
});
DetallePedido.belongsTo(Pedido, { foreignKey: 'id_pedido' });  // Foreign key should match the field name
DetallePedido.belongsTo(Producto, { foreignKey: 'id_producto' });

Pedido.hasMany(DetallePedido, { foreignKey: 'id_pedido' });
Producto.hasMany(DetallePedido, { foreignKey: 'id_producto' });
export default DetallePedido;
