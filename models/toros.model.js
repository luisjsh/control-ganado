const Sequelize = require("sequelize");
const sequelize = require("../database");

const torosImagenes = require("./torosimagenes.model");
const logrosModel = require('./usefull-model/logros.model');
const pelajeModel = require('./usefull-model/pelaje.model')

const toros = sequelize.define(
  "toros",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: Sequelize.TEXT },
    hierro: { type: Sequelize.TEXT },
    hierrocodigo: { type: Sequelize.TEXT },
    tatuaje: {type: Sequelize.TEXT},
    pelaje: { type: Sequelize.INTEGER },
    encaste: {type: Sequelize.TEXT},
    sexo: { type: Sequelize.TEXT },
    //logros: { type: Sequelize.INTEGER },
    //notas: { type: Sequelize.TEXT },
    madreid: { type: Sequelize.INTEGER },
    padreid: { type: Sequelize.INTEGER },
    fechanac: { type: Sequelize.TEXT },
    tientadia: {type: Sequelize.TEXT},
    tientaresultado: {type: Sequelize.TEXT},
    tientatentadopor: {type: Sequelize.TEXT},
    tientalugar: {type: Sequelize.TEXT},
    tientacapa: {type: Sequelize.TEXT},
    tientacaballo: {type: Sequelize.TEXT},
    tientamuleta: {type: Sequelize.TEXT}
  },
  {
    timestamps: false,
  }
);

toros.belongsTo(pelajeModel, {foreignKey: 'pelaje', as: 'pelajes' , sourceKey:'id'})
toros.hasMany(torosImagenes, { foreignKey: "torosid", sourceKey: "id" });
torosImagenes.belongsTo(toros, { foreignKey: "torosid", sourceKey: "id" });

module.exports = toros;
