const Sequelize = require('sequelize');
const sequelize = require('../../database')

const logros = sequelize.define('logros', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
    nombre: {type: Sequelize.TEXT}
},{
    timestamps:false
})

module.exports = logros;