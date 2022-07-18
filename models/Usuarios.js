const Sequelize = require('sequelize');
const db = require('../config/database');
const Propiedades = require('../models/Propiedades');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre : {
        type: Sequelize.STRING(45),
        allowNull : false,

    },
    apellido : {
        type: Sequelize.STRING(45),
        allowNull : false,
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Error!, Debe ingresar un E-mail Válido'
            },
            notEmpty: {
                msg: 'Por favor, Ingrese E-mail'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario Ya Registrado'
        }

    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg : 'Por favor Ingrese Contraseña'
            }
        }
    },
    fecha : {
        type : Sequelize.DATE,
        allowNull : false,
    }
});
Usuarios.hasMany(Propiedades);


module.exports = Usuarios;