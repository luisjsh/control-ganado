'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
      email: Sequelize.TEXT,
      clave: Sequelize.TEXT,
      admin: Sequelize.BOOLEAN,
      nombre: Sequelize.TEXT,
      primerapregunta: Sequelize.TEXT,
      primerapreguntarespuesta: Sequelize.TEXT,
      segundapregunta: Sequelize.TEXT,
      segundapreguntarespuesta: Sequelize.TEXT,
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('usuarios');
  }
};
