const Sequelize = require('sequelize')
const sequelize = require('../database')

const usuarioImagenes = sequelize.define('usuariosimagene',{
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
    path: {type: Sequelize.TEXT},
    usuarioid: {type: Sequelize.INTEGER}
},{
    timestamps:false
})

module.exports = usuarioImagenes;