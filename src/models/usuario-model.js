import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';
import Rol from './rol-model.js'

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rolId: {
    type: DataTypes.INTEGER,
    references:{model:Rol,key:'id'}
  },
});

Usuario.belongsTo(Rol, { foreignKey: 'rolId' });

export default Usuario;