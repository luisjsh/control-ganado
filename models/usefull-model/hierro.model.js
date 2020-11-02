const Sequelize = require('sequelize');
const sequelize = require('../../database')

const hierros = sequelize.define('hierros', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
    path: {type: Sequelize.TEXT},
    codigo: {type: Sequelize.TEXT}
},{
    timestamps:false
})

module.exports = hierros;