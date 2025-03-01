import { DataTypes } from "sequelize";
import { sequelize } from "../database/config.js";

const Product = sequelize.define('Product', {
    nombre_producto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER, // Ahora es un número entero
        allowNull: false
    },
    precio_producto: {
        type: DataTypes.FLOAT, // Permite valores decimales para precios
        allowNull: false
    }
}, {
    tableName: 'Product',
    underscored: true
});

// Sincronizar modelo con la base de datos sin eliminar datos existentes
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Usamos `alter` en lugar de `force`
        console.log('Tabla productos sincronizada con éxito');
    } catch (error) {
        console.error('Error al sincronizar la tabla productos:', error);
    }
})();

export default Product;
