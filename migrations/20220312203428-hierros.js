'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('hierros', { 
      id: Sequelize.INTEGER,
      path: Sequelize.TEXT,
      codigo: Sequelize.TEXT,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('hierros');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
