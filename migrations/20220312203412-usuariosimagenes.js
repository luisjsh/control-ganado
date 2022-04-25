'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuariosimagenes', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
      path: Sequelize.TEXT,
      usuarioid: {
        type: Sequelize.INTEGER,
      }
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('usuariosimagenes');
  }
};
