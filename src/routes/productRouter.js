import { DataTypes } from "sequelize";
import { sequelize } from "../database/config";

const Roles= sequelize.define(
    'Roles',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },
        nombreRol:{
            type:DataTypes.STRING,
            allowNull:false
        },
        estado:{
            type:DataTypes.ENUM('Activo','Inactivo'),
            defaultValue:'Activo'
        },
        descrpcion:{
            type:DataTypes.TEXT,
        }
    },
    (async()=>{
        try{
            await sequelize.sync({alter:true});
            console.log('Tabla ROLES sincronizado con exito')
        } catch(error){
            console.error('error en la sincronizacion de la tabla', error)
        }
    }
));

export default Roles;