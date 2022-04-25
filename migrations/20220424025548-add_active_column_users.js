'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 
    'status',
    { 
      type: Sequelize.TEXT
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
