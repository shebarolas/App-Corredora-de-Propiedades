const db = require('../config/database');
const sequelize = require('sequelize');


const imagen = db.define('imagen', {
        id : {
            type: sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        path: {
            type: sequelize.STRING(45),
            allowNull: true
        }
});

module.exports = imagen;