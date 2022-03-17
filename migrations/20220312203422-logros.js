'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('logros', { 
      id: Sequelize.INTEGER,
      nombre: Sequelize.TEXT,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('logros');
      /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
