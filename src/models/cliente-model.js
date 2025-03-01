import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCompleto: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    documentoIdentidad: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    correoElectronico: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    genero: {
      type: DataTypes.ENUM("Masculino", "Femenino", "Otro"),
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
      defaultValue: "Activo",
    },
  },
  {
    timestamps: true,
    tableName: "clientes",
  },
)

export default Cliente

