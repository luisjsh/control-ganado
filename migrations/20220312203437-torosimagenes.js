'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('torosimagenes', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
      path: Sequelize.TEXT,
      torosid: {
        type: Sequelize.INTEGER 
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
