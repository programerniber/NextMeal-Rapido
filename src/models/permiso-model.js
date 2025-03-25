import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Usuario from "./usuario-model.js";

const Permiso = sequelize.define(
  "Permiso",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios", // 🔹 Asegurarse de que coincida con el nombre real de la tabla en la BD
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    recurso: {
      type: DataTypes.ENUM("ventas", "pedidos", "productos", "categorias", "clientes"),
      allowNull: false,
    },
    accion: {
      type: DataTypes.ENUM("crear", "editar"),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "permisos",
    timestamps: true,
  }
);

// 🔹 Asegurar relaciones
Permiso.belongsTo(Usuario, { foreignKey: "id_usuario", onDelete: "CASCADE" });
Usuario.hasMany(Permiso, { foreignKey: "id_usuario", onDelete: "CASCADE" });

export default Permiso;
