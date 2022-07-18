const Sequelize = require('sequelize');
const db = require('../config/database');
const Usuarios = require('../models/Usuarios');

const TipoUsuario = db.define('tipoUsuario', {
    idTipoUsuario: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    nombreTipoUsuario: {
        type: Sequelize.STRING(45),
        allowNull: false   
    }
});

TipoUsuario.hasOne(Usuarios, {
    foreignKey: "idTipoUsuario"
});



module.exports = TipoUsuario;