'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('torosimagenes', { 
      id: Sequelize.INTEGER,
      path: Sequelize.TEXT,
      torosid: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'toros',
            schema: 'schema'
          },
          key: 'id'
        }
      }
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('torosimagenes');
      /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
