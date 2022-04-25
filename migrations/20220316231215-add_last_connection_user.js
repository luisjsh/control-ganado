'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 
    'last_connection',
    { 
      type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
