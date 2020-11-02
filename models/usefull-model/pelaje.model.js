const Sequelize = require('sequelize');
const sequelize = require('../../database')

const pelajes = sequelize.define('pelajes', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
    nombre: {type: Sequelize.TEXT}
},{
    timestamps:false
})

module.exports = pelajes;