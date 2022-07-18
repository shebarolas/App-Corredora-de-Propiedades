const Sequelize = require('sequelize');
const db = require('../config/database');
const imagen = require('../models/imagen');

const Propiedades = db.define('propiedades', {
    idPropiedades: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    nombreProp :{
        type: Sequelize.STRING(45),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    estado: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    valor: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    habitaciones: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    baño: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    estacionamiento: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    amoblado: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    direcciones: {
        type: Sequelize.STRING(100)
    }

});
Propiedades.hasMany(imagen, {
    foreignKey: 'idPropiedades'
});

module.exports = Propiedades;