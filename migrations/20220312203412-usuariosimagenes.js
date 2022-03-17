'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuariosimagenes', { 
      id: Sequelize.INTEGER,
      path: Sequelize.TEXT,
      usuarioid: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'usuarios',
            schema: 'schema'
          },
          key: 'id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('usuariosimagenes');
  }
};
