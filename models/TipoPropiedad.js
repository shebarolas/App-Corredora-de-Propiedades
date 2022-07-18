const Sequelize = require('sequelize');
const db = require('../config/database');
const Propiedades = require('./Propiedades');

const TipoPropiedad = db.define('TipoPropiedad', {
    idTipoProp : {
        type : Sequelize.INTEGER(11),
        autoIncrement : true,
        primaryKey : true
    },
    nombre: {
        type : Sequelize.STRING(45),
        allowNull : false
    }
});

TipoPropiedad.hasOne(Propiedades, {
     foreignKey : 'idTipoProp'
});



module.exports = TipoPropiedad;