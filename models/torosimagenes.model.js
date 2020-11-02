const Sequelize = require('sequelize')
const sequelize = require('../database')

const torosimagenes = sequelize.define('torosimagenes',{
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
    path: {type: Sequelize.TEXT},
    torosid: {type: Sequelize.INTEGER}
},{
    timestamps:false
})

module.exports = torosimagenes;