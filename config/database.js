const Sequelize = require('sequelize');

const db = new Sequelize('arriendoProp', 'root', 'root' ,{
    host : 'localhost',
    dialect : 'mysql',
    define : {
        timestamps : false
    },

    pools: {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
});

module.exports = db;