const Sequelize = require("sequelize");
const sequelize = require("../database");

const usuarioImagenes = require("./usuarioImagenes");

const usuarios = sequelize.define(
  "usuario",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.TEXT, allowNull: false },
    clave: { type: Sequelize.TEXT },
    admin: { type: Sequelize.BOOLEAN },
    nombre: { type: Sequelize.TEXT },
    primerapregunta: { type: Sequelize.TEXT },
    primerapreguntarespuesta: { type: Sequelize.TEXT },
    segundapregunta: { type: Sequelize.TEXT },
    segundapreguntarespuesta: { type: Sequelize.TEXT },
  },
  {
    timestamps: false,
  }
);

usuarios.hasMany(usuarioImagenes, { foreignKey: "usuarioid", sourceKey: "id", onDelete: 'cascade' });
usuarioImagenes.belongsTo(usuarios, {
  foreignKey: "usuarioid",
  sourceKey: "id",
  onDelete: 'cascade' 
});

module.exports = usuarios;
